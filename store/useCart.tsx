import { create } from "zustand";
import CartItemInterface from "@/types/cartItemInterface";

interface StoreInterface {
  items: CartItemInterface[];
  addItem(item: CartItemInterface): void;
  addQuantity(item: CartItemInterface): void;
}

const useCart = create<StoreInterface>((set, get) => ({
  items: [],

  addItem(item) {
    const { items, addQuantity } = get();

    const update = items.find((e) => e.id === item.id);
    if (update) return addQuantity(update);

    set({ items: [...items, item] });
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
}));

export default useCart;
