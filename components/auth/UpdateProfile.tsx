"use client";

import Input from "@/components/form/Input";

export default function () {
  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
    >
      <form>
        <h2 className="mb-5 text-2xl font-semibold">Update Profile</h2>

        <Input
          type="text"
          placeholder="Type your name"
          text="Full name"
          setValue={() => {}}
        />

        <Input
          type="email"
          placeholder="Type your email"
          text="Email"
          setValue={() => {}}
        />

        <div className="mb-4">
          <span className="block mb-1"> Avatar </span>
          <label
            htmlFor="doc"
            className="flex items-center p-4 gap-3 rounded-3xl border border-gray-300 border-dashed bg-gray-50 cursor-pointer"
          >
            <img className="h-16 w-auto" src="/upload-cloud.png" alt="" />.
            <div className="space-y-2">
              <h4 className="text-base font-semibold text-gray-700">
                Upload a file
              </h4>
              <span className="text-sm text-gray-500">Max 2 MB</span>
            </div>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept=".png,.jpg,.jpeg"
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
    </div>
  );
}
