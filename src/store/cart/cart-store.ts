import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CartProduct } from '@/interfaces';

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subtotal: number;
    total: number;
    taxes: number;
    itemsInCart: number;
  };

  addProductToCart: ( product: CartProduct ) => void;
  updateProductQuantity: ( product: CartProduct, quantity: number ) => void;
  removeProduct: ( product: CartProduct ) => void;

  clearCart: () => void;
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

        getSummaryInformation: () => {
          const { cart } = get();
          
          const subtotal = cart.reduce(
            (subtotal, item) => (item.price * item.quantity) + subtotal, 0
          );

          const taxes = subtotal * .21;
          const total = subtotal + taxes;
          const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

          return {
            subtotal,
            total,
            taxes,
            itemsInCart,
          }
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
          const updateCartProducts = cart.map((item) => {
            if ( item.id === product.id && item.size === product.size ) {
              return {...item, quantity: item.quantity + product.quantity}
            }

            return item;
          });

          set({ cart: updateCartProducts });
        },
        

        updateProductQuantity: ( product: CartProduct, quantity: number ) =>  {
          const { cart } = get();

          const updateCartProducts = cart.map((item) => {
            if ( item.id === product.id && item.size === product.size ) {
              return {...item, quantity: quantity}
            }

            return item;
          });

          set({ cart: updateCartProducts });
        },


        removeProduct: ( product: CartProduct ) => {
          const { cart } = get();

          const updateCartProducts = cart.filter((item) =>
            item.id !== product.id || item.size !== product.size
          );

          set({ cart: updateCartProducts });
        },


        clearCart: () => {
          set({ cart: [] });
        },
      })
    , {
      name: 'shopping-cart'
    }
  )
)
