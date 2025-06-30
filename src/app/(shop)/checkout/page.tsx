import Link from 'next/link';

import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import Image from 'next/image';


const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];


export default function() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verify order" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Adjust elements</span>
            <Link href="/cart" className="underline mb-5">Edit cart</Link>

          {/* Items */}
          {
            productsInCart.map(product => (
              <div key={ product.slug } className="flex mb-5">
                <Image
                  src={`/products/${ product.images[0] }`}
                  alt={ product.title }
                  width={ 100 }
                  height={ 100 }
                  style={{
                    width: '100px',
                    height: '100px',

                  }}
                  priority
                  className="mr-5 rounded"
                />

                <div>
                  <p>{ product.title }</p>
                  <p>${ product.price } x 3</p>
                  <p className="font-bold">Subtotal: ${ product.price * 3 }</p>
                </div>
              </div>
            ))
          }
        </div>

          {/* Checkout - Order summary */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Delivary address</h2>
            <div className="mb-10">
              <p className="text-xl">John Doe</p>
              <p>Somewhere 123</p>
              <p>Somewhere</p>
              <p>Somewhere asd</p>
              <p>Somewhere city</p>
              <p>PC 1231</p>
              <p>12 1231 231231</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl font-bold mb-2">Order summary</h2>

            <div className="grid grid-cols-2">
              <span>No. Products</span>
              <span className="text-right">3 articles</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Taxes (%21)</span>
              <span className="text-right">$100</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-2xl mt-5 text-right">$100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <p className="mb-5">
                <span className="text-xs">
                  By clicking in "Order", you agree our <Link href="/">terms and conditions</Link> and <Link href="/">privacy policies</Link>
                </span>
              </p>

              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}