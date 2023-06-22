"use client";

import Search from "$components/layout/Search";
import { Auth } from "$components/utility";
import { useSelector } from "$store/index";
import { CartIcon } from "$svg/icons";
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
          className="hidden md:block space-x-1 px-3 py-2 text-gray-700 bg-white shadow rounded-md hover:bg-gray-100 "
        >
          <CartIcon className="text-2xl inline-block" />
          <span>
            Cart (<b>{count}</b>)
          </span>
        </Link>

        <Auth />
      </nav>
    </header>
  );
}
