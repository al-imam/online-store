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
}

const useSingup = create<StoreInterface, [["zustand/devtools", never]]>(
  devtools((set) => ({
    name: "",
    email: "",
    password: "",
    nameSet: (name) => set({ name }),
    emailSet: (email) => set({ email }),
    passwordSet: (password) => set({ password }),
  }))
);

export default useSingup;
