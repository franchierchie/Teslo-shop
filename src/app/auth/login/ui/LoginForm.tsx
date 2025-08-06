'use client';

import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { authenticate } from '@/actions';
import { IoInformationOutline } from 'react-icons/io5';
import clsx from 'clsx';

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );


  useEffect(() => {
    if ( errorMessage === 'Success' ) {
      window.location.replace( callbackUrl );
    }
    
  }, [ errorMessage, callbackUrl ]);

  return (
    <form action={ formAction } className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        className="px-5 py-2 border border-transparent bg-gray-200 rounded mb-5"
      />


      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        className="px-5 py-2 border border-transparent bg-gray-200 rounded mb-5"
      />

      {
        ( errorMessage && errorMessage !== 'Success' ) && (
            <div className="flex items-center pb-2">
              <IoInformationOutline className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{ errorMessage }</p>
            </div>
          )
      }

      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <button
        type="submit"
        className={clsx({
          "btn-primary": !isPending,
          "btn-disabled": isPending
        })}
        disabled={ isPending }
      >
        Sign in
      </button>



      {/* divisor line */ }
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account" 
        className="btn-secondary text-center">
        Create account
      </Link>
    </form>
  )
}
