"use client";

import { FunctionComponent, ReactNode, createContext, useContext } from "react";
import { Post } from "@/utility/request";
import { AxiosResponse } from "axios";
import { SignInResponse, signIn } from "next-auth/react";

interface User {
  name: string;
  email: string;
  password: string;
}

interface Value {
  singup: ({ name, email, password }: User) => Promise<AxiosResponse<any, any>>;
  singin(email: string, password: string): Promise<SignInResponse | undefined>;
}

const AuthContext = createContext<Value | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  function singup({ name, email, password }: User) {
    return Post("auth/singup", { name, email, password });
  }

  function singin(
    email: string,
    password: string
  ): Promise<SignInResponse | undefined> {
    return signIn("credentials", { email, password, redirect: false });
  }

  return (
    <AuthContext.Provider value={{ singup, singin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

function useAuth() {
  return useContext(AuthContext) as Value;
}

export default useAuth;
