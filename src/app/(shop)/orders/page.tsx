import { redirect } from 'next/navigation';
import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';

import { Title } from '@/components';
import { getOrdersByUser } from '@/actions';

export default async function OrdersPage() {
  const { ok, orders = [] } = await getOrdersByUser();

  if ( !ok ) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr className="border-b border-gray-200">
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Full Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Status
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map(order => (
                <tr key={ order.id } className="bg-white border-b border-gray-200 transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    { order.id.split('-').at(-1) }
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    { order.OrderAddress?.firstName } { order.OrderAddress?.lastName }
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                    {
                      ( order.isPaid )
                        ? (
                          <>
                            <IoCardOutline className="text-green-800" />
                            <span className='mx-2 text-green-800'>Paid</span>
                          </>
                        )
                        : (
                          <>
                            <IoCardOutline className="text-red-800" />
                            <span className='mx-2 text-red-800'>Not paid</span>
                          </>
                        )
                    }

                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    <Link href={`/orders/${ order.id }`} className="hover:underline">
                      See order
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}