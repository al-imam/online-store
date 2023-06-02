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
import { Post, Put } from "@/utility/request";
import { removeCookies } from "cookies-next";
import COOKIES from "@/utility/COOKIES";
import { setCookie, getCookie, hasCookie } from "cookies-next";
import { dispatchManualChange, onLocalStorageChange } from "@/utility/event";
import { parseLocal, removeLocal, setLocal } from "@/utility/store";

interface User {
  name: string;
  email: string;
  password: string;
}

type Modify<T, R> = Omit<T, keyof R> & R;

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
  singout: (callback?: () => void) => void;
  currentUser: CurrentUser | null;
  updateProfile: ({
    onError,
    onSuccess,
    formData,
  }: Modify<
    Pick<Auth, "onError" | "onSuccess">,
    {
      onSuccess: (v: CurrentUser) => void;
      formData: FormData;
    }
  >) => Promise<void>;
  updatePassword: ({
    password,
    current,
    onError,
    onSuccess,
  }: Omit<Auth, "name" | "email"> & {
    current: string;
  }) => Promise<void>;
}

function merge(user: CurrentUser) {
  const oldUserData = parseLocal(localName);
  if (oldUserData !== null) {
    return setLocal(localName, { auth: oldUserData.auth, user });
  }

  throw new Error("unauthenticated");
}

const AuthContext = createContext<Value | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const localName = "online-store-user-information" as const;

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [wait, setWait] = useState(true);

  useEffect(() => {
    const data = parseLocal(localName);

    const v = validate(data, [
      ["auth", (auth) => typeof auth === "string"],
      ["user", (user, validate) => validate(user, ["name", "email", "avatar"])],
    ]);

    if (v.valid) {
      setCurrentUser(v.checked.user);
      setCookie(COOKIES, v.checked.auth);
    } else {
      setCurrentUser(null);
    }

    setWait(false);
  }, []);

  useEffect(() => {
    const destroyListen = onLocalStorageChange(() => {
      const data = parseLocal(localName);

      const v = validate(data, [
        ["auth", (auth) => typeof auth === "string"],
        [
          "user",
          (user, validate) => validate(user, ["name", "email", "avatar"]),
        ],
      ]);

      if (v.valid) {
        if (hasCookie(COOKIES)) return;
        return setCookie(COOKIES, v.checked.auth);
      }

      if (data !== null) {
        removeLocal(localName);
        removeCookies(COOKIES);
        setCurrentUser(null);
      } else {
        removeCookies(COOKIES);
        setCurrentUser(null);
      }
    });

    const destroyDispatch = dispatchManualChange();

    return () => {
      destroyListen();
      destroyDispatch();
    };
  }, []);

  function singout(callback: () => void = () => {}) {
    callback();
    setCurrentUser(null);
    removeLocal(localName);
  }

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
      setLocal(localName, data);
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
      setLocal(localName, data);
    } catch (e) {
      onError(e);
    }
  }

  async function updatePassword({
    password,
    current,
    onError = () => {},
    onSuccess = () => {},
  }: Omit<Auth, "name" | "email"> & { current: string }) {
    try {
      const { data } = await Put(
        "me/update-password",
        { password, current },
        {
          headers: { Authorization: `Bearer ${getCookie(COOKIES)}` },
        }
      );
      onSuccess();
    } catch (e) {
      onError(e);
    }
  }

  async function updateProfile({
    onError = () => {},
    onSuccess = () => {},
    formData,
  }: Modify<
    Pick<Auth, "onError" | "onSuccess">,
    { onSuccess: (v: CurrentUser) => void; formData: FormData }
  >) {
    try {
      const { data } = await Post<CurrentUser>("me/update-profile", formData, {
        headers: { Authorization: `Bearer ${getCookie(COOKIES)}` },
      });
      onSuccess(data);
      merge(data);
      setCurrentUser(data);
    } catch (e) {
      onError(e);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        singout,
        singup,
        singin,
        currentUser,
        updateProfile,
        updatePassword,
      }}
    >
      {wait || children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

function useAuth() {
  return useContext(AuthContext) as Value;
}

export default useAuth;
