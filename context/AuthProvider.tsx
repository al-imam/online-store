"use client";

import {
  FunctionComponent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import validate from "nested-object-validate";
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

type Auth = User & { onError?: (e: any) => void; onSuccess?: () => void };

interface Value {
  singup: (object: Auth) => void;
  singin: (object: Omit<Auth, "name">) => void;
  currentUser: CurrentUser | null;
}

const AuthContext = createContext<Value | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const localName = "online-store-user-information" as const;

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [wait, setWait] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(localName) as string);

    const v = validate(data, [
      ["auth", (auth) => typeof auth === "string"],
      ["user", (user, validate) => validate(user, ["name", "email", "avatar"])],
    ]);

    if (v.valid) {
      return setCurrentUser(data.user);
    }

    setCurrentUser(null);
  }, []);

  async function singup({
    name,
    email,
    password,
    onError = () => {},
    onSuccess = () => {},
  }: Auth) {
    try {
      const { data } = await Post("auth/singup", { name, email, password });
      onSuccess();
      setCurrentUser(data.user);
      localStorage.setItem(localName, JSON.stringify(data));
    } catch (e) {
      onError(e);
    }
  }

  async function singin({
    email,
    password,
    onError = () => {},
    onSuccess = () => {},
  }: Omit<Auth, "name">) {
    try {
      const { data } = await Post("auth/singin", { email, password });
      onSuccess();
      setCurrentUser(data.user);
      localStorage.setItem(localName, JSON.stringify(data));
    } catch (e) {
      onError(e);
    }
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
