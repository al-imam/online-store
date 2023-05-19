"use client";

import { FormEvent } from "react";
import useObjectStore from "use-object-store";
import { useRouter } from "next/navigation";

const Search = () => {
  const [{ search }, updateStore] = useObjectStore({ search: "" });
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const qp = new URLSearchParams(window.location.search);
    if (search !== "") qp.set("search", search);
    router.push(`/?${qp.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-nowrap items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4"
    >
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        placeholder="Enter your keyword"
        value={search}
        onChange={(e) => updateStore({ search: e.target.value })}
        required
      />
      <button
        type="button"
        className="px-4 py-2 inline-block text-white border border-transparent bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
