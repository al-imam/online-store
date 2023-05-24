"use client";

import { FormEvent, FunctionComponent } from "react";
import Link from "next/link";
import Input from "@/components/form/Input";
import useAuth from "@/context/AuthProvider";
import useSingup from "@/store/useSingup";

interface SingupProps {}

const Singup: FunctionComponent<SingupProps> = () => {
  const { singup } = useAuth();
  const get = useSingup((store) => store.get);
  const clear = useSingup((store) => store.clear);

  async function singupUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password, name } = get();
    await singup({ name, email, password });
    clear();
  }

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={singupUser} noValidate>
        <h2 className="mb-5 text-2xl font-semibold"> Create account </h2>

        <Input text="Full name" placeholder="Type your name" name="name" />
        <Input
          text="Email"
          placeholder="Type your email"
          type="email"
          name="email"
        />
        <Input
          text="Password"
          placeholder="Type your password"
          type="password"
          name="password"
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
