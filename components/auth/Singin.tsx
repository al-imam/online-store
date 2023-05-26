"use client";

import Link from "next/link";
import useObjectStore from "use-object-store";
import Input from "@/components/form/Input";
import useAuth from "@/context/AuthProvider";

const init = { email: "", password: "" };

const Singin = () => {
  const [store, updateStore] = useObjectStore(init);
  const { singin } = useAuth();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (Object.values(store).some((v) => v === "")) return;
    await singin(store);
    updateStore(init);
  };

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Singin</h2>

        <Input
          text="Email"
          placeholder="Type your email"
          value={store.email}
          setValue={(email) => updateStore({ email })}
        />

        <Input
          text="Password"
          placeholder="Type your password"
          value={store.password}
          setValue={(password) => updateStore({ password })}
        />

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Singin
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          Don't have an account?
          <Link href="/singup" className="text-blue-500">
            Singup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Singin;
