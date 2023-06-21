"use client";

import Search from "$components/layout/Search";
import { Auth } from "$components/utility";
import { useSelector } from "$store/index";
import Link from "next/link";

export default function () {
  const count = useSelector((state) => state.items.length);

  return (
    <header className="bg-white text-gray-800 flex h-16 items-center shadow-sm">
      <nav className="mx-auto max-w-screen-xl px-4 flex gap-4 items-center relative w-full">
        <Link href="/">
          <span className="text-gray-700 text-xl">store</span>
        </Link>

        <Search />

        <Link
          href="/cart"
          className="px-3 py-2 text-center text-gray-700 bg-white shadow rounded-md hover:bg-gray-100 hover:border-gray-300 hidden md:inline-block"
        >
          <i className="text-gray-600/80 w-5 fa fa-shopping-cart"></i>
          <span className="ml-1">
            Cart (<b>{count}</b>)
          </span>
        </Link>

        <Auth />
      </nav>
    </header>
  );
}
