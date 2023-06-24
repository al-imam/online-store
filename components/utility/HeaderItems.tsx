"use client";

import { Profile } from "$components/nav";
import useAuth from "$context/AuthProvider";
import { UserAddIcon } from "$svg/user";
import Link from "next/link";

export default function () {
  const { currentUser } = useAuth();

  return currentUser ? (
    <Profile />
  ) : (
    <Link
      href="/singin"
      className="px-6 py-2 flex justify-center items-center gap-1 text-gray-700 bg-white shadow-sm rounded hover:bg-gray-100"
    >
      <UserAddIcon />
      <span>Singin</span>
    </Link>
  );
}
