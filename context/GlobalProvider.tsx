"use client";

import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthProvider";
import { ToastContainer } from "react-toastify";

function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastContainer position="top-center" />
      {children}
    </AuthProvider>
  );
}

export default GlobalProvider;
