"use client";

import Input from "@/components/form/Input";

export default function () {
  const onSubmit = () => {};

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
          name="name"
          setValue={(current) => {}}
        />

        <Input
          type="password"
          placeholder="Type your password"
          text="New password"
          name="name"
          setValue={(password) => {}}
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
