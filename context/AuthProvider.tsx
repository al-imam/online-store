"use client";

import { FunctionComponent, ReactNode, createContext, useContext } from "react";
import { Post } from "@/utility/request";
import { AxiosResponse } from "axios";

interface User {
  name: string;
  email: string;
  password: string;
}

interface Value {
  singup: ({ name, email, password }: User) => Promise<AxiosResponse<any, any>>;
}

const AuthContext = createContext<Value | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  function singup({ name, email, password }: User) {
    return Post("auth/singup", { name, email, password });
  }

  return (
    <AuthContext.Provider value={{ singup }}>{children}</AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext) as Value;
}

export default useAuth;
