"use client";

import { ReactNode, createContext, useContext } from "react";
import { Address } from "@/components/user/NewAddress";
import { Delete, Post, Put } from "@/utility/request";
import { getCookie } from "cookies-next";
import COOKIES from "@/utility/COOKIES";

interface AddressInterface {
  addNewAddress: (
    object: Address & {
      id: string;
      onError?: (e: any) => void;
      onSuccess?: () => void;
    }
  ) => Promise<void>;
  updateAddress: (
    object: Address & {
      onError?: (e: any) => void;
      onSuccess?: () => void;
      id: string;
    }
  ) => Promise<void>;
  removeAddress: (object: {
    onError?: (e: any) => void;
    onSuccess?: () => void;
    id: string;
  }) => Promise<void>;
}

const Context = createContext<AddressInterface | null>(null);

export function AddressProvider({ children }: { children: ReactNode }) {
  async function addNewAddress({
    onError = () => {},
    onSuccess = () => {},
    id,
    ...address
  }: Address & {
    onError?: (e: any) => void;
    onSuccess?: () => void;
    id: string;
  }) {
    try {
      await Post("address", address, {
        headers: { Authorization: `Bearer ${getCookie(COOKIES)}` },
      });
      onSuccess();
    } catch (e: any) {
      onError(e);
    }
  }

  async function updateAddress({
    onError = () => {},
    onSuccess = () => {},
    id,
    ...address
  }: Address & {
    onError?: (e: any) => void;
    onSuccess?: () => void;
    id: string;
  }) {
    try {
      await Put(`address/${id}`, address, {
        headers: { Authorization: `Bearer ${getCookie(COOKIES)}` },
      });
      onSuccess();
    } catch (e: any) {
      onError(e);
    }
  }

  async function removeAddress({
    onError = () => {},
    onSuccess = () => {},
    id,
  }: {
    onError?: (e: any) => void;
    onSuccess?: () => void;
    id: string;
  }) {
    try {
      await Delete(`address/${id}`, {
        headers: { Authorization: `Bearer ${getCookie(COOKIES)}` },
      });
      onSuccess();
    } catch (e: any) {
      onError(e);
    }
  }

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
