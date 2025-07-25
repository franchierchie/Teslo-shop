'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '../../../auth';

export const getOrdersByUser = async() => {
  const session = await auth();

  if ( !session?.user ) {
    return {
      ok: false,
      message: 'You should be authenticated.',
    }
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
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
