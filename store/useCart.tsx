import { create } from "zustand";
import CartItemInterface from "@/types/cartItemInterface";

interface StoreInterface {
  items: CartItemInterface[];
  addItem(item: CartItemInterface): void;
  updateItem(id: string): void;
}

const useCart = create<StoreInterface>((set, get) => ({
  items: [],

  addItem(item: CartItemInterface) {
    const { items, updateItem } = get();
    const update = items.find((e) => e.id === item.id);
    if (update) return updateItem(update.id);
    set({ items: [...items, item] });
  },

  updateItem(id: string) {
    set((store) => ({
      items: store.items.map((item) => {
        if (item.id === id) {
          item.quantity++;
          return item;
        }
        return item;
      }),
    }));
  },
}));

export default useCart;
