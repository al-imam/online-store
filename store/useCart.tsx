import { create } from "zustand";
import CartItemInterface from "@/types/cartItemInterface";

interface StoreInterface {
  items: CartItemInterface[];
  addItem(item: CartItemInterface): void;
}

const useCart = create<StoreInterface>((set) => ({
  items: [],
  addItem(item: CartItemInterface) {
    return set((store) => ({ items: [...store.items, item] }));
  },
}));

export default useCart;
