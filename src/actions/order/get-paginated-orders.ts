'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '../../../auth';

export const getPaginatedOrders = async() => {
  const session = await auth();

  if ( session?.user.role !== 'admin' ) {
    return {
      ok: false,
      message: 'You should be authenticated.',
    }
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return {
    ok: true,
    orders: orders,
  }
}
