"use client";

import { FormEvent, FunctionComponent } from "react";
import Link from "next/link";
import Input from "@/components/form/Input";
import useAuth from "@/context/AuthProvider";
import useObjectStore from "use-object-store";

interface SingupProps {}

const init = { name: "", email: "", password: "" };

const Singup: FunctionComponent<SingupProps> = () => {
  const { singup } = useAuth();
  const [store, updateStore] = useObjectStore(init);

  async function singupUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (Object.values(store).some((v) => v === "")) return;
    await singup(store);
    updateStore(init);
  }

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={singupUser} noValidate>
        <h2 className="mb-5 text-2xl font-semibold"> Create account </h2>

        <Input
          text="Full name"
          placeholder="Type your name"
          name="name"
          value={store.name}
          setValue={(name) => updateStore({ name })}
        />
        <Input
          text="Email"
          placeholder="Type your email"
          type="email"
          name="email"
          value={store.email}
          setValue={(email) => updateStore({ email })}
        />
        <Input
          text="Password"
          placeholder="Type your password"
          type="password"
          name="password"
          value={store.password}
          setValue={(password) => updateStore({ password })}
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
          <Link href="/singin" className="text-blue-500">
            Singin
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Singup;
