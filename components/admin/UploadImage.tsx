"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

export default function ({ id }: { id: string }) {
  const [images, setImages] = useState<string[]>([]);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from<File>(e.target.files as any);
    setImages(files.map((file) => URL.createObjectURL(file)));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
  }

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={onSubmit}>
        <h2 className="mb-3 text-2xl font-semibold">Upload Product Images</h2>

        <div className="mb-4 flex flex-col md:flex-row">
          <div className="w-full">
            <input
              className="block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-8"
              type="file"
              name="images"
              multiple={true}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2 my-5">
          {images.map((img) => (
            <Image
              src={img}
              key={img}
              alt="Preview"
              className="col-span-1 object-contain shadow rounded border-2 border-gray p-2 h-full w-full"
              width="50"
              height="50"
            />
          ))}
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          disabled={false ? true : false}
        >
          {false ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
