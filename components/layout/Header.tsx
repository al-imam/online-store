"use client";

import Search from "$components/layout/Search";
import { Auth } from "$components/utility";
import { useSelector } from "$store/index";
import Link from "next/link";

export default function () {
  const count = useSelector((state) => state.items.length);

  return (
    <header className="bg-white text-gray-800 flex h-16 items-center shadow-sm">
      <nav className="mx-auto max-w-screen-xl px-4 flex gap-4 items-center relative w-full"></nav>
    </header>
  );
}
