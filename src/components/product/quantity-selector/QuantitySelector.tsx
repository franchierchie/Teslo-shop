'use client';

import { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;

  onQuantityChanged: ( quantity: number ) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {

  const onValueChanged = ( value: number ) => {
    if ( quantity + value < 1 ) return;
    if ( quantity + value > 5 ) return;

    onQuantityChanged( quantity + value );
  }

  return (
    <div className="flex items-center">
      <button onClick={() => onValueChanged(-1)}>
        <IoRemoveCircleOutline size={ 30 } />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">{ quantity }</span>

      <button onClick={() => onValueChanged(1)}>
        <IoAddCircleOutline size={ 30} />
      </button>
    </div>
  )
}
