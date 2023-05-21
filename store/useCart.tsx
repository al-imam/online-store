import { create } from "zustand";

interface ItemInterface {
  id: string;
  name: string;
  price: number;
  imageURL: string;
  stock: number;
  seller: string;
  quantity: number;
}

interface StoreInterface {
  items: ItemInterface[];
}

const useCart = create<StoreInterface>((set) => ({
  items: [],
}));

export default useCart;
