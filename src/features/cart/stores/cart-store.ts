import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "@/types/product";
import { calculateCartTotal } from "@/lib/utils";

interface CartStore {
  // State
  items: CartItem[];
  isOpen: boolean;

  // Computed
  itemCount: () => number;
  total: () => number;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  isItemInCart: (id: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isOpen: false,

      // Computed values
      itemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      total: () => {
        return calculateCartTotal(get().items);
      },

      // Add item to cart
      addItem: (item: CartItem) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) =>
              i.id === item.id &&
              i.selectedColor === item.selectedColor &&
              i.selectedSize === item.selectedSize
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id &&
                  i.selectedColor === item.selectedColor &&
                  i.selectedSize === item.selectedSize
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        });
      },

      // Remove item from cart
      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      // Update item quantity
      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      // Clear all items
      clearCart: () => {
        set({ items: [] });
      },

      // Toggle cart visibility
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      // Open cart
      openCart: () => {
        set({ isOpen: true });
      },

      // Close cart
      closeCart: () => {
        set({ isOpen: false });
      },

      isItemInCart: (id: string) => {
        return !!get().items.find((item) => item.id === id);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
