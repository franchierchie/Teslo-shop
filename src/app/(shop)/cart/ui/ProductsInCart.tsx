'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useCartStore } from '@/store';
import { ProductImage, QuantitySelector } from '@/components';

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState( false );
  
  const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
  const removeProduct = useCartStore(state => state.removeProduct);
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
            <ProductImage
              src={ product.image }
              alt={ product.title }
              width={ 100 }
              height={ 100 }
              style={{
                width: '100px',
                height: '100px',

              }}
              className="mr-5 rounded"
            />

            <div>
              <Link
                className="hover:underline cursor-pointer"
                href={`/product/${ product.slug }`}
              >
                { product.size } - { product.title }
              </Link>
              <p>${ product.price }</p>
              <QuantitySelector
                quantity={ product.quantity }
                onQuantityChanged={quantity => updateProductQuantity( product, quantity )}
              />

              <button
                onClick={() => removeProduct( product )}
                className="underline mt-3 cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      }
    </>
  )
}
