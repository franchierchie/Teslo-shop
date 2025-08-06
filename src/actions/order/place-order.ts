'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '../../../auth';
import type { Address, Size } from '@/interfaces';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async( productIds: ProductToOrder[], address: Address ) => {
  const session = await auth();
  const userId = session?.user.id

  // Check if the user is logged in
  if ( !userId ) {
    return {
      ok: false,
      message: 'There is no user session.',
    }
  }

  // Get the information of the products
  // Note: the user can order 2+ products with the same id (same product, different size)
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map(p => p.productId)
      },
    },
  });

  // Calculate amounts
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  // tax, subtotal, total
  const { subTotal, tax, total } = productIds.reduce((totals, item) => {
    const productQuantity = item.quantity;
    const product = products.find(product => product.id === item.productId);

    if ( !product ) throw new Error(`${ item.productId } does not exist - 500`);

    const subTotal = product.price * productQuantity;

    totals.subTotal += subTotal;
    totals.tax += subTotal * .21;
    totals.total += subTotal * 1.21;

    return totals;

  }, { subTotal: 0, tax: 0, total: 0 });

  // Create the transaction of DB
  try {
    const prismaTx = await prisma.$transaction(async(tx) => {
      // Update stock
      const updatedProductsPromises = products.map(( product ) => {
        const productQuantity = productIds.filter(
          p => p.productId === product.id
        ).reduce((acc, item) => item.quantity + acc, 0);

        if ( productQuantity === 0 ) {
          throw new Error(`${ product.id }, does not have a defined amount.`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all( updatedProductsPromises );

      // Check if there is stock available
      updatedProducts.forEach(product => {
        if ( product.inStock < 0 ) {
          throw new Error(`${ product.title } is currently out of stock.`);
        }
      });

      // Create order - Header
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map(p => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price: products.find(product => product.id === p.productId)?.price ?? 0,
              })),
            }
          }
        },
      });

      // Validation, if the product price is 0, that's an error

      // Create direction address
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        }
      });

      return {
        updatedProducts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      }
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    }

  } catch (error: unknown) {
    let message = "Something went wrong.";

    if ( error instanceof Error ) {
      message = error.message;
    }

    return {
      ok: false,
      message,
    }
  }
}
