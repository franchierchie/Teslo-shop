import { redirect } from 'next/navigation';

export default function GenderPage() {
  redirect('/');

  return (
    <div>
      <h1>Cart Page</h1>
    </div>
  );
}