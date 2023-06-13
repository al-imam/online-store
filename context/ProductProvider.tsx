"use client";

import Prettify from "@/types/Prettify";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { Delete, Post } from "@/utility/request";
import COOKIES from "@/utility/COOKIES";
import { getCookie } from "cookies-next";

interface CallBackFun<Res = any> {
  onError: (error: any) => void;
  onSuccess: (response: Res) => void;
}

type Product = Record<
  "name" | "description" | "price" | "seller" | "stock" | "category",
  string
>;

type ModifyFun<T, S = any> = (values: T & Partial<CallBackFun<S>>) => void;

interface ProductValue {
  create: ModifyFun<Product & { url: string }>;
  remove: ModifyFun<{ id: string }>;
  uploadImages: ModifyFun<{
    id: string;
    formData: FormData;
  }>;
}

const ProductContext = createContext<ProductValue | null>(null);

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const create: ModifyFun<Product & { url: string }> = async ({
    onError = () => {},
    onSuccess = () => {},
    url,
    ...rest
  }) => {
    const product = Object.fromEntries(
      Object.entries(rest).map(([key, value]) =>
        ["price", "stock"].includes(key)
          ? [key, parseFloat(value)]
          : [key, value]
      )
    );

    try {
      const { data } = await Post(url, product, {
        headers: { Authorization: `Bearer ${getCookie(COOKIES)}` },
      });

      onSuccess(data);
    } catch (e) {
      onError(e);
    }
  };

  const remove: ModifyFun<{ id: string }> = async ({
    onError = () => {},
    onSuccess = () => {},
    id,
  }) => {
    try {
      const { data } = await Delete(`product/${id}`, {
        headers: { Authorization: `Bearer ${getCookie(COOKIES)}` },
      });

      onSuccess(data);
    } catch (e) {
      onError(e);
    }
  };

  const uploadImages: ModifyFun<{ id: string; formData: FormData }> = async ({
    onError = () => {},
    onSuccess = () => {},
    id,
    formData,
  }) => {
    try {
      const { data } = await Post(`product/${id}/upload-images`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie(COOKIES)}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onSuccess(data);
    } catch (e) {
      onError(e);
    }
  };

  return (
    <ProductContext.Provider value={{ create, remove, uploadImages }}>
      {children}
    </ProductContext.Provider>
  );
}

function useProduct() {
  return useContext(ProductContext) as Prettify<ProductValue>;
}

export default useProduct;
