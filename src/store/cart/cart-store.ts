import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CartProduct } from '@/interfaces';

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  addProductToCart: ( product: CartProduct ) => void;
  // updateProductQuantity
  // removeProduct
}


export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
        cart: [],

        // Methods
        getTotalItems: () => {
          const { cart } = get();
          return cart.reduce((total, item) => total + item.quantity, 0);
        },
        addProductToCart: ( product: CartProduct ) => {
          const { cart } = get();

          // Check if the size is available
          const productInCart = cart.some(
            ( item ) => (item.id === product.id && item.size === product.size)
          );

          if ( !productInCart ) {
            set({ cart: [...cart, product]});
            return;
          }

          // The size is available, update the amount of items in the cart with that size
          const updateCartProducts = cart.map((item) => {;
            if ( item.id === product.id && item.size === product.size ) {
              return {...item, quantity: item.quantity + product.quantity}
            }

            return item;
          });

          set({ cart: updateCartProducts });
        }
      })
    , {
      name: 'shopping-cart'
    }
  )
)
