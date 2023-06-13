"use client";

import useProduct from "@/context/ProductProvider";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function ({ id }: { id: string }) {
  const [images, setImages] = useState<string[]>([]);
  const { uploadImages } = useProduct();

  const ref = useRef<HTMLInputElement>(null);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from<File>(e.target.files as any);
    setImages(files.map((file) => URL.createObjectURL(file)));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (images.length === 0) {
      return toast.error("Select at least one image!");
    }

    const formData = new FormData(e.currentTarget);
    uploadImages({
      id,
      formData,
      onError(e) {
        console.warn(e);
        toast.error("Something went wrong!");
      },
      onSuccess() {
        toast.success("Images uploaded successfully!");
        setImages([]);
        ref.current && (ref.current.value = "");
      },
    });
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
              accept="image/*"
              ref={ref}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="mt-4">
          {images.map((img) => (
            <img
              src={img}
              key={img}
              alt="Preview"
              className="object-contain mb-4 shadow rounded h-full w-full"
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
