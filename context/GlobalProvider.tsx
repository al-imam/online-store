"use client";

import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthProvider";
import { AddressProvider } from "@/context/AddressProvider";
import { ToastContainer } from "react-toastify";

function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastContainer position="top-center" />
      <AddressProvider>{children}</AddressProvider>
    </AuthProvider>
  );
}

export default GlobalProvider;
