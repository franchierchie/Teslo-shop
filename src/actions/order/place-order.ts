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
}
