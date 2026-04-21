import { create } from 'zustand';
import { CartItem } from '../models/cart/CartItem';
import { Product, ProductExtra } from '../models/product/Product';

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, extras?: ProductExtra[]) => void;
  removeFromCart: (cartItemId: string) => void;
  increaseQuantity: (cartItemId: string) => void;
  decreaseQuantity: (cartItemId: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getIgv: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (product, extras = []) =>
    set(state => {
      const existingItem = state.items.find(
        item =>
          item.productId === product.id &&
          JSON.stringify(item.extras) === JSON.stringify(extras),
      );

      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price:
          product.price + extras.reduce((sum, extra) => sum + extra.price, 0),
        quantity: 1,
        image: product.image,
        deliveryTime: product.deliveryTime,
        extras,
      };

      return { items: [...state.items, newItem] };
    }),

  removeFromCart: cartItemId =>
    set(state => ({
      items: state.items.filter(item => item.id !== cartItemId),
    })),

  increaseQuantity: cartItemId =>
    set(state => ({
      items: state.items.map(item =>
        item.id === cartItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    })),

  decreaseQuantity: cartItemId =>
    set(state => ({
      items: state.items
        .map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),

  getSubtotal: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

  getIgv: () => get().getSubtotal() * 0.18,

  getTotal: () => get().getSubtotal() + get().getIgv(),
}));
