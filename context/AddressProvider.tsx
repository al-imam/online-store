"use client";

import { ReactNode, createContext, useContext } from "react";
import { Address } from "@/components/user/NewAddress";
import { Post } from "@/utility/request";
import { getCookie } from "cookies-next";
import COOKIES from "@/utility/COOKIES";

interface AddressInterface {
  addNewAddress: (
    object: Address & {
      onError?: (e: any) => void;
      onSuccess?: () => void;
    }
  ) => Promise<void>;
}

const Context = createContext<AddressInterface | null>(null);

export function AddressProvider({ children }: { children: ReactNode }) {
  async function addNewAddress({
    onError = () => {},
    onSuccess = () => {},
    ...address
  }: Address & {
    onError?: (e: any) => void;
    onSuccess?: () => void;
  }) {
    try {
      console.log(getCookie(COOKIES));
      await Post("address", address, {
        headers: { Authorization: `Bearer ${getCookie(COOKIES)}` },
      });
      onSuccess();
    } catch (e) {
      onError(e);
    }
  }

  return (
    <Context.Provider value={{ addNewAddress }}>{children}</Context.Provider>
  );
}

function useAddress() {
  return useContext(Context) as AddressInterface;
}

export default useAddress;
