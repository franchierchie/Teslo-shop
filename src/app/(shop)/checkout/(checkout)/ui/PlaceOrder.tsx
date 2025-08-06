'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { placeOrder } from '@/actions';

export const PlaceOrder = () => {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore(state => state.address);
  const { subtotal, total, taxes, itemsInCart } = useCartStore(state => state.getSummaryInformation());

  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);


  const onPlaceOrder = async() => {
    setIsPlacingOrder(true);
    // await sleep(2);

    const productsToOrder = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    // Server action
    const resp = await placeOrder( productsToOrder, address );
    if ( !resp.ok ) {
      setIsPlacingOrder(false);
      setErrorMessage( resp.message ?? 'Something went wrong.' );
      return;
    }

    clearCart();
    router.replace(`/orders/${ resp.order?.id }`);
  }

  if ( !loaded ) {
    return <p>Loading...</p>
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl font-bold mb-2">Delivary address</h2>
      <div className="mb-10">
        <p className="text-xl">{ address.firstName } { address.lastName }</p>
        <p>{ address.address }</p>
        <p>{ address.address2 }</p>
        <p>{ address.postalCode }</p>
        <p>{ address.city }, { address.country }</p>
        <p>{ address.phone }</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl font-bold mb-2">Order summary</h2>

      <div className="grid grid-cols-2">
        <span>No. Products</span>
        <span className="text-right">
          {(itemsInCart === 1) ? '1 article' : `${ itemsInCart } articles` }
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat( subtotal )}</span>

        <span>Taxes (%21)</span>
        <span className="text-right">{currencyFormat( taxes )}</span>

        <span className="text-2xl mt-5">Total:</span>
        <span className="text-2xl mt-5 text-right">{currencyFormat( total )}</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs">
            By clicking in &quot;Order&quot;, you agree our <Link href="/">terms and conditions</Link> and <Link href="/">privacy policies</Link>
          </span>
        </p>

        <p className="text-red-500">{ errorMessage }</p>

        <button
          // href="/orders/123"
          onClick={ onPlaceOrder }
          className={
            clsx(
              "flex btn-primary justify-center",
              {
                'btn-primary': !isPlacingOrder,
                'btn-disabled': isPlacingOrder,
              }
            )
          }
        >
          Order
        </button>
      </div>
    </div>
  )
}
