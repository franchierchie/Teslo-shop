import { Title } from '@/components';
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();

  if ( !session?.user ) {
    // redirect('/auth/login?returnTo=/profile');
    redirect('/');
  }

  return (
    <div>
      <Title title="Profile" />

      <pre>{ JSON.stringify( session.user, null, 2 ) }</pre>

      <h3 className="text-3xl mt-10">{ session.user.role }</h3>
    </div>
  );
}