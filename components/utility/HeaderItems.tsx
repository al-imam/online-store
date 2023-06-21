"use client";

import { Profile } from "$components/nav";
import useAuth from "$context/AuthProvider";
import Link from "next/link";

export default function () {
  const { currentUser } = useAuth();

  return currentUser ? (
    <Profile />
  ) : (
    <Link
      href="/singin"
      className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
    >
      <i className="text-gray-400 w-5 fa fa-user" />
      <span className="hidden lg:inline ml-1">Singin</span>
    </Link>
  );
}
