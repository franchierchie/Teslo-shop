import { redirect } from 'next/navigation';
import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';

import { Pagination, Title } from '@/components';
import { getPaginatedUsers } from '@/actions';
import { UsersTable } from './ui/UsersTable';

export default async function UsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if ( !ok ) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title="Admin - Users" />

      <div className="mb-10">
        <UsersTable users={ users } />

        <Pagination totalPages={ 1 } />
      </div>
    </>
  );
}