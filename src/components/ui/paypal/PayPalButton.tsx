'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js';

import { paypalCheckPayment, setTransactionId } from '@/actions';

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = (Math.round( amount * 100 )) / 100;

  if ( isPending ) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded mt-4" />
      </div>
    );
  }

  const createOrder = async( data: CreateOrderData, actions: CreateOrderActions ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: `${ roundedAmount }`,
            currency_code: 'USD',
          }
        }
      ]
    });

    // console.log({ transactionId });
    // console.log({ orderId, transactionId });
    const resp = await setTransactionId( orderId, transactionId );

    if ( !resp.ok ) {
      throw new Error('The order could not be updated correctly.');
    }

    return transactionId;
  }

  const onApprove = async( data: OnApproveData, actions: OnApproveActions ) => {
    const details = await actions.order?.capture();
    if ( !details ) return;

    await paypalCheckPayment( details.id ?? '' );
  }

  return (
    <PayPalButtons
      createOrder={ createOrder }
      onApprove={ onApprove }
    />
  )
}
