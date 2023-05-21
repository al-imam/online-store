import { create } from "zustand";
import CartItemInterface from "@/types/cartItemInterface";

interface StoreInterface {
  items: CartItemInterface[];
  addItem(item: CartItemInterface): void;
  updateItem(item: CartItemInterface): void;
}

const useCart = create<StoreInterface>((set, get) => ({
  items: [],

  addItem(item: CartItemInterface) {
    const { items, updateItem } = get();

    const update = items.find((e) => e.id === item.id);
    if (update) return updateItem(update);

    set({ items: [...items, item] });
  },

  updateItem(item: CartItemInterface) {
    if (!(item.stock > item.quantity)) return;

    set((store) => ({
      items: store.items.map((el) => {
        if (el.id === item.id) {
          el.quantity++;
          return el;
        }
        return el;
      }),
    }));
  },
}));

export default useCart;
