"use client";

import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthProvider";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";

function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ToastContainer position="top-center" />
        {children}
      </AuthProvider>
    </SessionProvider>
  );
}

export default GlobalProvider;
