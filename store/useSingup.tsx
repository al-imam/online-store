import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface StoreInterface {
  name: string;
  email: string;
  password: string;
  nameSet: (name: string) => void;
  emailSet: (email: string) => void;
  passwordSet: (password: string) => void;
  get(): StoreInterface;
  clear(): void;
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
    clear: () => set({ name: "", email: "", password: "" }),
  }))
);

export default useSingup;
