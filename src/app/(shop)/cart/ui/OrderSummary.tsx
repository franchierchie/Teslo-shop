'use client';

import { useEffect, useState } from 'react';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState( false );
  const { subtotal, total, taxes, itemsInCart } = useCartStore(state => state.getSummaryInformation());

  useEffect(() => {
    setLoaded( true );
  }, []);
  
  if ( !loaded ) return <p>Loading...</p>;

  return (
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
  )
}
