import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import CartItemInterface from "@/types/cartItemInterface";

interface StoreInterface {
  name: string;
  email: string;
  password: string;
  nameSet: (name: string) => void;
  emailSet: (email: string) => void;
  passwordSet: (password: string) => void;
  get(): StoreInterface;
}

const useSingup = create<StoreInterface, [["zustand/devtools", never]]>(
  devtools((set, get) => ({
    name: "",
    email: "",
    password: "",
    nameSet: (name) => set({ name }),
    emailSet: (email) => set({ email }),
    passwordSet: (password) => set({ password }),
    get: () => get(),
  }))
);

export default useSingup;
