"use client";

import { UserWithOutPassword } from "@/types/UserInterface";
import COOKIES from "@/utility/COOKIES";
import { dispatchManualChange, onLocalStorageChange } from "@/utility/event";
import { Post, Put } from "@/utility/request";
import { parseLocal, removeLocal, setLocal } from "@/utility/store";
import { getCookie, hasCookie, removeCookies, setCookie } from "cookies-next";
import validate from "nested-object-validate";
import type { FunctionComponent, ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import Prettify from "@/types/Prettify";

interface NEP {
  name: string;
  email: string;
  password: string;
}

type AuthFun<TObject, S = any> = (
  values: TObject & Partial<CallBackFun<S>>
) => void;

interface CurrentUser extends UserWithOutPassword {}

type SingupFun = AuthFun<NEP>;
type SinginFun = AuthFun<Omit<NEP, "name">>;
type SingoutFun = (callback: () => void) => void;
type UpdateProfileFun = AuthFun<{ formData: FormData }, CurrentUser>;
type UpdatePasswordFun = AuthFun<{ current: string; password: string }>;

interface CallBackFun<Res = any> {
  onError: (e: any) => void;
  onSuccess: (r?: Res) => void;
}

interface Value {
  singup: SingupFun;
  singin: SinginFun;
  singout: SingoutFun;
  currentUser: CurrentUser | null;
  updateProfile: UpdateProfileFun;
  updatePassword: UpdatePasswordFun;
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

  const singout: SingoutFun = (callback) => {
    callback();
    setCurrentUser(null);
    removeLocal(localName);
  };

  const singup: SingupFun = async ({
    name,
    email,
    password,
    onError = () => {},
    onSuccess = () => {},
  }) => {
    try {
      const { data } = await Post("auth/singup", { name, email, password });
      onSuccess();
      setCurrentUser(data.user);
      setLocal(localName, data);
    } catch (e) {
      onError(e);
    }
  };

  const singin: SinginFun = async ({
    email,
    password,
    onError = () => {},
    onSuccess = () => {},
  }) => {
    try {
      const { data } = await Post("auth/singin", { email, password });
      onSuccess();
      setCurrentUser(data.user);
      setLocal(localName, data);
    } catch (e) {
      onError(e);
    }
  };

  const updatePassword: UpdatePasswordFun = async ({
    password,
    current,
    onError = () => {},
    onSuccess = () => {},
  }) => {
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
  };

  const updateProfile: UpdateProfileFun = async ({
    onError = () => {},
    onSuccess = () => {},
    formData,
  }) => {
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
  };

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
  return useContext(AuthContext) as Prettify<Value>;
}

export default useAuth;
