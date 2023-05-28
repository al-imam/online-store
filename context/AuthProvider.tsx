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

interface User {
  name: string;
  email: string;
  password: string;
}

interface CurrentUser extends Omit<User, "password"> {
  avatar: string | { char: string; bg: string; fg: string };
  _id: string;
  created: string;
  role: string;
}

type Auth = User & { onError: (e: any) => void; onSuccess: () => void };

interface Value {
  singup: (object: Auth) => void;
  singin: (object: Omit<Auth, "name">) => void;
  currentUser: CurrentUser | null;
}

const AuthContext = createContext<Value | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [wait, setWait] = useState(true);

  async function singup({
    name,
    email,
    password,
    onError = () => {},
    onSuccess = () => {},
  }: Auth) {
    try {
      await Post("auth/singup", { name, email, password });
      onSuccess();
    } catch (e) {
      onError(e);
    }
  }

  function singin({ email, password }: Omit<Auth, "name">) {
    return () => {};
  }

  return (
    <AuthContext.Provider value={{ singup, singin, currentUser }}>
      {wait || children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

function useAuth() {
  return useContext(AuthContext) as Value;
}

export default useAuth;
