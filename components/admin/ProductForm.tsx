"use client";

import useProduct from "@/context/ProductProvider";
import categories from "@/utility/categories";
import { ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import useObjectStore from "use-object-store";
import { useRouter } from "next/navigation";
import uuid from "@/utility/uuid";

const value = {
  name: "",
  description: "",
  price: "",
  category: categories[0].toLowerCase(),
  seller: "",
  stock: "",
};

export default function ({
  init = value,
  title = "Create new product",
  is = "Create product",
  url = "product",
}) {
  const [store, updateStore] = useObjectStore(init);
  const { addOrEdit } = useProduct();
  const router = useRouter();

  function onChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    updateStore({
      [e.target.name]: e.target.value,
    } as Record<keyof typeof value, string>);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (
      Object.entries(store).some(([key, value]) =>
        ["price", "stock"].includes(key)
          ? isNaN(parseFloat(value))
          : value.trim() === ""
      )
    ) {
      toast.error("Enter valid data!");
    }

    addOrEdit({
      ...store,
      url,
      onSuccess() {
        updateStore(value);
        router.push(`/me/admin/products?id=${uuid()}`);
      },
      onError(error) {
        console.warn(error);
      },
    });
  }

  return (
    <section className="container max-w-3xl p-6 mx-auto">
      <h1 className="mb-3 text-xl md:text-3xl font-semibold text-black">
        {title}
      </h1>

      <form onSubmit={onSubmit} noValidate>
        <div className="mb-4">
          <label className="block mb-1"> Name </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Product name"
            name="name"
            value={store.name}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4 mt-5">
          <label className="block mb-1"> Description </label>
          <textarea
            rows={4}
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Product description"
            name="description"
            value={store.description}
            onChange={onChange}
            required
          ></textarea>
        </div>

        <div className="grid md:grid-cols-2 gap-x-2 mt-5">
          <div className="mb-4">
            <label className="block mb-1"> Price </label>
            <div className="relative">
              <div className="col-span-2">
                <input
                  type="text"
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  placeholder="0.00"
                  name="price"
                  value={store.price}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1"> Category </label>
            <div className="relative">
              <select
                className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                name="category"
                value={store.category}
                onChange={onChange}
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
              <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
                <svg
                  width="22"
                  height="22"
                  className="fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 10l5 5 5-5H7z"></path>
                </svg>
              </i>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-2 mt-5">
          <div className="mb-4">
            <label className="block mb-1"> Seller / Brand </label>
            <input
              type="text"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              placeholder="Seller or brand"
              name="seller"
              value={store.seller}
              onChange={(e) => updateStore({ seller: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1"> Stock </label>
            <div className="relative">
              <div className="col-span-2">
                <input
                  type="text"
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  placeholder="0"
                  name="stock"
                  value={store.stock}
                  onChange={(e) => updateStore({ stock: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          {is}
        </button>
      </form>
    </section>
  );
}
