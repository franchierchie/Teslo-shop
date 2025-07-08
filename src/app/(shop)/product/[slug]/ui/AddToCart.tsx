'use client';

import { useState } from 'react';

import { QuantitySelector, SizeSelector } from '@/components';
import type { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore(state => state.addProductToCart);

  const [size, setSize] = useState<Size|undefined>();
  const [quantity, setQuantity] = useState<number>( 1 );
  const [posted, setPosted] = useState( false );

  const addToCart = () => {
    setPosted( true );

    if ( !size ) return;

    // console.log({ size, quantity });
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    }
    addProductToCart( cartProduct );
    setPosted( false );
    setQuantity( 1 );
    setSize( undefined );
  }

  return (
    <>
    {
      ( posted && !size ) && (
        <p className="mt-2 text-red-500">
          You must select a size before adding this product to your cart.*
        </p>
      )
    }

      {/* Sizes */}
      <SizeSelector
        selectedSize={ size }
        availableSizes={ product.sizes }
        onSizeChanged={ setSize }
      />

      {/* Amount */}
      <QuantitySelector
        quantity={ quantity }
        onQuantityChanged={ setQuantity }
      />

      <button
        className="btn-primary my-5"
        onClick={ addToCart }
      >
          Add to cart
        </button>
    </>
  )
}
