"use client";

import Search from "$components/layout/Search";
import { Dropdown } from "$components/nav";
import useAuth from "$context/AuthProvider";
import { useSelector } from "$store/index";
import { CartIcon, UserAddIcon } from "$svg/icons";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

export default function () {
  const count = useSelector((state) => state.items.length);
  const hide = useMediaQuery({ query: "(min-width: 768px)" });
  const { currentUser } = useAuth();

  return (
    <header className="bg-white text-gray-800 flex h-16 items-center shadow-sm">
      <nav className="mx-auto max-w-screen-xl px-4 flex gap-4 items-center relative w-full">
        <Link href="/">
          <span className="text-gray-700 text-xl">store</span>
        </Link>

        <Search />

        <Link
          href="/cart"
          className="hidden md:flex justify-center items-center gap-1 px-6 py-2 text-gray-700 bg-white shadow-sm rounded hover:bg-gray-100"
        >
          <CartIcon className="text-2xl inline-block" />
          <span>
            Cart (<b>{count}</b>)
          </span>
        </Link>

        <Link
          href="/singin"
          className="hidden md:flex px-6 py-2 justify-center items-center gap-1 text-gray-700 bg-white shadow-sm rounded hover:bg-gray-100"
        >
          <UserAddIcon />
          <span>Singin</span>
        </Link>

        {(!hide || currentUser) && <Dropdown />}
      </nav>
    </header>
  );
}
