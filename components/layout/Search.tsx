"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent } from "react";
import useObjectStore from "use-object-store";

export default function () {
  const [{ search }, updateStore] = useObjectStore({ search: "" });
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const qp = new URLSearchParams(window.location.search);

    if (search !== "") {
      qp.set("search", search);
    } else {
      qp.delete("search");
    }

    router.push(`/?${qp.toString()}`);
  }

  function searchChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") {
      const qp = new URLSearchParams(window.location.search);
      const sq = qp.get("search");
      if (sq !== "" && sq !== null) {
        qp.delete("search");
        router.push(`/?${qp.toString()}`);
      }
    }
    updateStore({ search: e.target.value });
  }

  return (
    <form className="relative w-full md:w-2/4 mr-auto" onSubmit={handleSubmit}>
      <label className="sr-only">Search</label>

      <input
        type="text"
        placeholder="Enter your keyword"
        className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm form-input"
        value={search}
        onChange={searchChange}
      />

      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button className="text-gray-600 hover:text-gray-700 focus-visible:text-blue-400 focus-visible:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>
    </form>
  );
}
