import { redirect } from 'next/navigation';

import { auth } from '../../../auth';

export default async function ShopLayout({ children }: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if ( session ) {
    redirect('/');
  }

  return (
    <div className="flex justify-center px-5">
      <div className="w-full sm:w-[350px]">
        { children }
      </div>
    </div>
  );
}