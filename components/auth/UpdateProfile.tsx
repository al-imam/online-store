"use client";

import Input from "$components/form/Input";
import useAuth from "$context/AuthProvider";
import { ChangeEvent, FormEvent, useRef } from "react";
import { toast } from "react-toastify";
import useObjectStore from "use-object-store";

interface Store {
  name: string;
  url: null | string;
}

type NoUndefinedField<T> = {
  [P in keyof T]: Exclude<T[P], null | undefined>;
};

type CurrentUser = NoUndefinedField<
  Pick<ReturnType<typeof useAuth>, "currentUser" | "updateProfile">
>;

export default function () {
  const { currentUser, updateProfile } = useAuth() as CurrentUser;

  const [userInfo, updateUserInfo] = useObjectStore<Store>({
    name: currentUser.name,
    url: null,
  });

  const ref = useRef<HTMLInputElement | null>(null);

  function onImageChnange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      return updateUserInfo({
        url: URL.createObjectURL(event.target.files[0]),
      });
    }
    updateUserInfo({ url: null });
    ref.current && (ref.current.value = "");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.target as any);
    if (userInfo.name.trim() === "" && userInfo.url === null) {
      return toast.error("Add name or avatar");
    }

    updateProfile({
      formData: data,
      onSuccess(v) {
        toast.success("Profile updated successfully!");
      },
      onError(e) {
        console.log(e);
      },
    });
  }

  const file = ref.current && ref.current.files && ref.current.files[0];

  return (
    <form
      onSubmit={onSubmit}
      style={{ maxWidth: "480px" }}
      className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
    >
      <h2 className="mb-5 text-2xl font-semibold">Update Profile</h2>

      <Input
        type="text"
        placeholder="Type your name"
        text="Full name"
        name="name"
        setValue={(name) => updateUserInfo({ name })}
        value={userInfo.name}
      />

      <div className="mb-4">
        <span className="block mb-1"> Avatar </span>
        <label
          htmlFor="avatar"
          className="flex items-center p-4 gap-3 rounded-3xl border border-gray-300 border-dashed bg-gray-50 cursor-pointer"
        >
          <img
            className="h-16 w-auto"
            src={userInfo.url === null ? "/upload-cloud.png" : userInfo.url}
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
