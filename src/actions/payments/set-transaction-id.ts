'use server';

import { prisma } from '@/lib/prisma';

export const setTransactionId = async( orderId: string, transactionId: string ) => {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId: transactionId },
    });

    if ( !order ) {
      return {
        ok: false,
        message: `The order with the id ${ transactionId } does not exist.`,
      }
    }

    return {
      ok: true,
    }
    
  } catch (error) {
    console.log( error );
    return {
      ok: false,
      message: "There was an error saving the id of the transaction."
    }
  }
}
