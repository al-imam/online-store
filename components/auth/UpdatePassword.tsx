"use client";

import Input from "@/components/form/Input";
import useAuth from "@/context/AuthProvider";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import useObjectStore from "use-object-store";
import { useRouter } from "next/navigation";

const init = { current: "", password: "" };

export default function () {
  const [store, updateStore] = useObjectStore(init);
  const { updatePassword } = useAuth();
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!Object.values(store).every((v) => v.length > 5)) {
      return toast.error("Enter valid current password and password ");
    }

    updatePassword({
      ...store,
      onSuccess() {
        router.push("/me");
        toast.success("Password updated successfully!");
        updateStore(init);
      },
      onError(e) {
        console.log(e);
        toast.error("Something went wrong!");
      },
    });
  };

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-5 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
    >
      <form onSubmit={onSubmit}>
        <h2 className="mb-5 text-2xl font-semibold">Update Password</h2>

        <Input
          type="password"
          placeholder="Type your current password"
          text="Current password"
          name="current"
          setValue={(current) => updateStore({ current })}
          value={store.current}
        />

        <Input
          type="password"
          placeholder="Type your password"
          text="New password"
          name="password"
          setValue={(password) => updateStore({ password })}
          value={store.password}
        />

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
}
