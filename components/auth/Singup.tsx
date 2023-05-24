"use client";

import { FunctionComponent } from "react";
import Link from "next/link";
import useObjectStore from "use-object-store";
import Input from "../form/Input";

interface SingupProps {}

const Singup: FunctionComponent<SingupProps> = ({}) => {
  const [{ email, name, password }, updateStore] = useObjectStore({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form>
        <h2 className="mb-5 text-2xl font-semibold"> Create account </h2>

        <Input
          text="Full name"
          placeholder="Type your name"
          value={name}
          name="name"
          onChange={(e) => updateStore({ name: e.target.value })}
        />
        <Input
          text="Email"
          placeholder="Type your email"
          type="email"
          value={email}
          name="email"
          onChange={(e) => updateStore({ email: e.target.value })}
        />
        <Input
          text="Password"
          placeholder="Type your password"
          type="password"
          value={password}
          name="password"
          onChange={(e) => updateStore({ password: e.target.value })}
        />

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Singup
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          Already have an account?
          <Link href="/login" className="text-blue-500">
            login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Singup;
