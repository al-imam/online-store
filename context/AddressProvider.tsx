"use client";

import { ReactNode, createContext, useContext } from "react";
import { Address } from "@/components/user/NewAddress";
import { Delete, Post, Put } from "@/utility/request";
import { getCookie } from "cookies-next";
import COOKIES from "@/utility/COOKIES";

interface CallBackFun<Res = any> {
  onError: (error: any) => void;
  onSuccess: (response: Res) => void;
}

type ModifyFun<T, S = any> = (values: T & Partial<CallBackFun<S>>) => void;

interface AddressInterface {
  addNewAddress: ModifyFun<Address & { id: string }>;
  updateAddress: ModifyFun<Address & { id: string }>;
  removeAddress: ModifyFun<{ id: string }>;
}

const Context = createContext<AddressInterface | null>(null);

export function AddressProvider({ children }: { children: ReactNode }) {
  const addNewAddress: ModifyFun<Address & { id: string }> = async ({
    onError = () => {},
    onSuccess = () => {},
    id,
    ...address
  }) => {
    try {
      await Post("address", address, {
        headers: { Authorization: `Bearer ${getCookie(COOKIES)}` },
      });
      onSuccess(undefined);
    } catch (e: any) {
      onError(e);
    }
  };

  const updateAddress: ModifyFun<Address & { id: string }> = async ({
    onError = () => {},
    onSuccess = () => {},
    id,
    ...address
  }) => {
    try {
      await Put(`address/${id}`, address, {
        headers: { Authorization: `Bearer ${getCookie(COOKIES)}` },
      });
      onSuccess(undefined);
    } catch (e: any) {
      onError(e);
    }
  };

  const removeAddress: ModifyFun<{ id: string }> = async ({
    onError = () => {},
    onSuccess = () => {},
    id,
  }) => {
    try {
      await Delete(`address/${id}`, {
        headers: { Authorization: `Bearer ${getCookie(COOKIES)}` },
      });
      onSuccess(undefined);
    } catch (e: any) {
      onError(e);
    }
  };

  return (
    <Context.Provider value={{ addNewAddress, updateAddress, removeAddress }}>
      {children}
    </Context.Provider>
  );
}

function useAddress() {
  return useContext(Context) as AddressInterface;
}

export default useAddress;
