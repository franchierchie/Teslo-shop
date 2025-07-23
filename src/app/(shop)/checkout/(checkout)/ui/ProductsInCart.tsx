'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState( false );
  const productsInCart = useCartStore(state => state.cart);

  useEffect(() => {
    setLoaded( true );

  }, []);

  if ( !loaded ) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {
        productsInCart.map(product => (
          <div key={`${ product.slug }-${ product.size }`} className="flex mb-5">
            <Image
              src={`/products/${ product.image }`}
              alt={ product.title }
              width={ 100 }
              height={ 100 }
              style={{
                width: '100px',
                height: '100px',

              }}
              priority
              className="mr-5 rounded"
            />

            <div>
              <p>{ product.size } - { product.title } ({ product.quantity})</p>
              <p className="font-bold">{ currencyFormat( product.price * product.quantity ) }</p>
            </div>
          </div>
        ))
      }
    </>
  )
}
