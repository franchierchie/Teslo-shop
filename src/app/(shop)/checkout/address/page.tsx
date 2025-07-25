
import { Title } from '@/components';
import { getCountries, getUserAddress } from '@/actions';

import { auth } from '../../../../../auth';
import { AddressForm } from './ui/AddressForm';

export default async function AddressPage() {
  const countries = await getCountries();
  const session = await auth();

  if ( !session?.user ) {
    return (
      <h3 className="text-5xl">500 - There's no user session</h3>
    )
  }

  const userAddress = await getUserAddress( session.user.id ) ?? undefined;

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        
        <Title title="Address" subtitle="Delivery Address" />

        <AddressForm countries={ countries } userStoredAddress={ userAddress } />
      </div>
    </div>
  );
}