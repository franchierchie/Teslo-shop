'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '../../../auth';

export const getPaginatedUsers = async() => {
  const session = await auth();

  if ( session?.user.role !== 'admin' ) {
    return {
      ok: false,
      message: 'User is not an admin.',
    }
  }

  const users = await prisma.user.findMany({
    orderBy: {
      name: 'desc',
    }
  });

  return {
    ok: true,
    users,
  }
}
