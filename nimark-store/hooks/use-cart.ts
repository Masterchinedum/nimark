import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { Product } from '@/types';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === data.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
          toast.success('Item quantity updated in cart.');
        } else {
          set({ items: [...currentItems, { ...data, quantity: 1 }] });
          toast.success('Item added to cart.');
        }
      },

      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success('Item removed from cart.');
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
