"use client";

import { persistor, store } from "$store/index";
import { AddressProvider } from "@/context/AddressProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { ProductProvider } from "@/context/ProductProvider";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";

function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} />
      <AuthProvider>
        <ToastContainer position="top-center" limit={1} autoClose={2000} />
        <ProductProvider>
          <AddressProvider>{children}</AddressProvider>
        </ProductProvider>
      </AuthProvider>
    </Provider>
  );
}

export default GlobalProvider;
