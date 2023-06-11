"use client";

import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthProvider";
import { AddressProvider } from "@/context/AddressProvider";
import { ToastContainer } from "react-toastify";
import { ProductProvider } from "@/context/ProductProvider";

function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastContainer position="top-center" limit={1} autoClose={2000} />
      <ProductProvider>
        <AddressProvider>{children}</AddressProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default GlobalProvider;
