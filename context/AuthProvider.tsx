"use client";

import {
  FunctionComponent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Post } from "@/utility/request";
import { AxiosResponse } from "axios";
import { SignInResponse, signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

interface User {
  name: string;
  email: string;
  password: string;
}

interface CurrentUser extends Omit<User, "password"> {
  avatar: string | { char: string; bg: string; fg: string };
}

interface Value {
  singup: (object: User) => Promise<AxiosResponse<any, any>>;
  singin: (object: Omit<User, "name">) => Promise<SignInResponse | undefined>;
  currentUser: CurrentUser | null;
}

const AuthContext = createContext<Value | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const { data } = useSession();

  useEffect(() => {
    if (!data) return setCurrentUser(null);
    setCurrentUser(data.user as CurrentUser);
  }, [data]);

  function singup({ name, email, password }: User) {
    return Post("auth/singup", { name, email, password });
  }

  function singin({
    email,
    password,
  }: Omit<User, "name">): Promise<SignInResponse | undefined> {
    return signIn("credentials", { email, password, redirect: false });
  }

  return (
    <AuthContext.Provider value={{ singup, singin, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

function useAuth() {
  return useContext(AuthContext) as Value;
}

export default useAuth;
