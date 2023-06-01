"use client";

import Input from "@/components/form/Input";
import { Post } from "@/utility/request";
import { ChangeEvent, FormEvent, useRef } from "react";
import useObjectStore from "use-object-store";

const init = {
  name: "",
  email: "",
  url: null,
};

type Modify<T, R> = Omit<T, keyof R> & R;

export default function () {
  const [store, updateStore] =
    useObjectStore<Modify<typeof init, { url: string | null }>>(init);

  const ref = useRef<HTMLInputElement | null>(null);

  function onImageChnange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      return updateStore({ url: URL.createObjectURL(event.target.files[0]) });
    }
    updateStore({ url: null });
    ref.current && (ref.current.value = "");
  }

  async function updateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as any);
    await Post("me/update-profile", data);
  }

  const file = ref.current && ref.current.files && ref.current.files[0];

  return (
    <form
      onSubmit={updateProfile}
      style={{ maxWidth: "480px" }}
      className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
    >
      <h2 className="mb-5 text-2xl font-semibold">Update Profile</h2>

      <Input
        type="text"
        placeholder="Type your name"
        text="Full name"
        name="password"
        setValue={(name) => updateStore({ name })}
        value={store.name}
      />

      <Input
        type="email"
        placeholder="Type your email"
        text="Email"
        name="email"
        setValue={(email) => updateStore({ email })}
        value={store.email}
      />

      <div className="mb-4">
        <span className="block mb-1"> Avatar </span>
        <label
          htmlFor="avatar"
          className="flex items-center p-4 gap-3 rounded-3xl border border-gray-300 border-dashed bg-gray-50 cursor-pointer"
        >
          <img
            className="h-16 w-auto"
            src={store.url === null ? "/upload-cloud.png" : store.url}
            alt="cloud icon"
          />
          .
          <div className="space-y-2">
            <h4 className="text-base font-semibold text-gray-700">
              {file
                ? file.name.length > 25
                  ? `${file.name.substring(0, 20)}....${file.name
                      .split(".")
                      .at(-1)}`
                      .replaceAll(" ", "-")
                      .toLowerCase()
                  : file.name
                : "Upload a file"}
            </h4>
            <span className="text-sm text-gray-500">
              {file ? `${(file.size / 1024).toFixed(2)} KB` : "Max 2 MB"}
            </span>
          </div>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept=".png,.jpg,.jpeg"
            onChange={onImageChnange}
            ref={ref}
            hidden
          />
        </label>
      </div>

      <button
        type="submit"
        className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
      >
        Update
      </button>
    </form>
  );
}
