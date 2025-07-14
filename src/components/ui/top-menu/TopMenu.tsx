'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';

import { titleFont } from '@/config/fonts';
import { useCartStore, useUIStore } from '@/store';

export const TopMenu = () => {
  const openSideMenu = useUIStore(state => state.openSideMenu);
  const totalItemsInCart = useCartStore(state => state.getTotalItems());

  const [loaded, setLoaded] = useState( false );

  useEffect(() => {
    setLoaded( true );
    
  }, []);
  
  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div className="">
        <Link href="/">
          <span className={`${ titleFont.className } antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Menu Options */}
      <div className="hidden sm:block">
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">Men</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">Women</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid">Kids</Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center gap-2">
        <Link href="/search">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link href={
          ( (totalItemsInCart === 0) && loaded )
            ? '/empty'
            : '/cart'
        }>
          <div className="relative">
            {
              ( loaded && totalItemsInCart > 0 ) && (
                <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                  { totalItemsInCart }
                </span>
              )
            }
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={ openSideMenu }
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menu
        </button>
      </div>
    </nav>
  )
}
