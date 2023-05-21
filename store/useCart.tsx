import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import CartItemInterface from "@/types/cartItemInterface";

interface StoreInterface {
  items: CartItemInterface[];
  addItem(item: CartItemInterface): void;
  addQuantity(item: CartItemInterface): void;
  removeQuantity(item: CartItemInterface): void;
  deleteItem(id: string): void;
}

const useCart = create<
  StoreInterface,
  [["zustand/devtools", never], ["zustand/persist", StoreInterface]]
>(
  devtools(
    persist(
      (set, get) => ({
        items: [],

        addItem(item) {
          const { items, addQuantity } = get();

          const update = items.find((e) => e.id === item.id);
          if (update) return addQuantity(update);

          set({ items: [...items, item] });
        },

        deleteItem(id) {
          set((store) => ({
            items: store.items.filter((item) => item.id !== id),
          }));
        },

        addQuantity(item) {
          const { items } = get();

          if (item && item.stock > item.quantity) {
            set({
              items: items.map((el) => {
                if (el.id === item.id) {
                  el.quantity++;
                  return el;
                }
                return el;
              }),
            });
          }
        },

        removeQuantity(item) {
          const { items } = get();

          if (item.quantity > 1) {
            set({
              items: items.map((el) => {
                if (el.id === item.id) {
                  el.quantity--;
                  return el;
                }
                return el;
              }),
            });
          }
        },
      }),
      { name: "cart-items", skipHydration: true }
    ),
    { enabled: true }
  )
);

export default useCart;
