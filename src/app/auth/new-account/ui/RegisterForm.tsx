'use client';

import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';

import { login, registerUser } from '@/actions';
import { useState } from 'react';

type FormInputs = {
  name: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async( data ) => {
    setErrorMessage('');
    const { name, email, password } = data;
    const resp = await registerUser( name, email, password );

    if ( !resp.ok ) {
      setErrorMessage( resp.message );
      return;
    }

    await login( email.toLowerCase(), password );
    window.location.replace('/');
  }

  return (
    <form onSubmit={handleSubmit( onSubmit )} className="flex flex-col">
      <div className="flex flex-col mb-5">
        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          type="text"
          className={
            clsx(
              "px-5 py-2 border border-gray-200 bg-gray-200 rounded-md",
              {
                'border-red-500': !!errors.name
              }
            )
          }
          autoFocus
          { ...register('name', { required: "* A name is required" }) }
        />
        {(errors.name?.type === 'required') && (<span className="text-red-500">{ errors.name?.message }</span>)}
      </div>

      <div className="flex flex-col mb-5">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className={
            clsx(
              "px-5 py-2 border border-gray-200 bg-gray-200 rounded-md",
              {
                'border-red-500': !!errors.email
              }
            )
          }
          { ...register('email', { required: "* An email is required", pattern: /^\S+@\S+$/i }) }
        />
        {(errors.email?.type === 'required') && (<span className="text-red-500">{ errors.email?.message }</span>)}
      </div>

      <div className="flex flex-col mb-5">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className={
            clsx(
              "px-5 py-2 border border-gray-200 bg-gray-200 rounded-md",
              {
                'border-red-500': !!errors.password
              }
            )
          }
          { ...register('password', { required: "* A password is required", minLength: 6 }) }
        />
        {(errors.password?.type === 'required') && (<span className="text-red-500">{ errors.password?.message }</span>)}
      </div>

      <span className="text-red-500">{ errorMessage }</span>

      <button
        type="submit"
        className="btn-primary">
        Create account
      </button>


      {/* divisor line */ }
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login" 
        className="btn-secondary text-center">
        Sign in
      </Link>
    </form>
  )
}
