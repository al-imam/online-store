"use client";

import { AuthProvider } from "@/context/AuthProvider";

function GlobalProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default GlobalProvider;
