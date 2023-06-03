import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import CartItemInterface from "@/types/cartItemInterface";

interface StoreInterface {
  items: CartItemInterface[];
  unit: number;
  total: number;
  addItem(item: CartItemInterface): void;
  addQuantity(item: CartItemInterface): void;
  removeQuantity(item: CartItemInterface): void;
  deleteItem(id: string): void;
}

const useCart = create<
  StoreInterface,
  [
    ["zustand/persist", StoreInterface],
    ["zustand/subscribeWithSelector", never]
  ]
>(
  persist(
    subscribeWithSelector((set, get) => ({
      items: [],
      unit: 0,
      total: 0,

      addItem(item) {
        const { items, addQuantity } = get();

        const update = items.find((e) => e.id === item.id);

        if (update) {
          addQuantity(update);
        } else {
          set((store) => ({ ...store, items: [...items, item] }));
        }
      },

      deleteItem(id) {
        set((store) => ({
          ...store,
          items: store.items.filter((item) => item.id !== id),
        }));
      },

      addQuantity(item) {
        if (item && item.stock > item.quantity) {
          set((store) => ({
            ...store,
            items: store.items.map((el) => {
              if (el.id === item.id) {
                el.quantity++;
                return el;
              }
              return el;
            }),
          }));
        }
      },

      removeQuantity(item) {
        if (item.quantity > 1) {
          set((store) => ({
            ...store,
            items: store.items.map((el) => {
              if (el.id === item.id) {
                el.quantity--;
                return el;
              }
              return el;
            }),
          }));
        }
      },
    })),
    { name: "cart-items", skipHydration: true }
  )
);

export default useCart;
