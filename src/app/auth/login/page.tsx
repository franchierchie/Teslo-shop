import Link from 'next/link';

import { titleFont } from '@/config/fonts';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Sign in</h1>

      <div className="flex flex-col">

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
        />


        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
        />

        <button
          
          className="btn-primary">
          Sign in
        </button>


        {/* divisor l ine */ }
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

      </div>
    </div>
  );
}
