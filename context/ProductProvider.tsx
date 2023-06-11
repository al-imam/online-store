"use client";

import Prettify from "@/types/Prettify";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import ProductInterface from "@/types/productInterface";
import { Post } from "@/utility/request";
import COOKIES from "@/utility/COOKIES";
import { getCookie } from "cookies-next";

interface CallBackFun<Res = undefined> {
  onError: (error: any) => void;
  onSuccess: (response: Res) => void;
}

type Product = Record<
  "name" | "description" | "price" | "seller" | "stock" | "category",
  string
>;

type ModifyFun<T, S = undefined> = (
  values: T & Partial<CallBackFun<S>>
) => void;

interface ProductValue {
  create: ModifyFun<Product>;
}

const ProductContext = createContext<ProductValue | null>(null);

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const create: ModifyFun<Product> = async ({
    onError = () => {},
    onSuccess = () => {},
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
      const { data } = await Post("product", product, {
        headers: { Authorization: `Bearer ${getCookie(COOKIES)}` },
      });

      onSuccess(data);
    } catch (e) {
      onError(e);
    }
  };

  return (
    <ProductContext.Provider value={{ create }}>
      {children}
    </ProductContext.Provider>
  );
}

function useProduct() {
  return useContext(ProductContext) as Prettify<ProductValue>;
}

export default useProduct;
