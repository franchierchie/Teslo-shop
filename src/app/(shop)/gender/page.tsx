import { redirect } from 'next/navigation';

export default function() {
  redirect('/');

  return (
    <div>
      <h1>Cart Page</h1>
    </div>
  );
}