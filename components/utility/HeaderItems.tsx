"use client";

import Link from "next/link";
import useCart from "@/store/useCart";
import { useEffect } from "react";
import Image from "next/image";
import useAuth from "@/context/AuthProvider";

export default function () {
  const { currentUser } = useAuth();

  const count = useCart((store) => store.items).length;

  useEffect(() => {
    (async () => await useCart.persist.rehydrate())();
  }, []);

  return (
    <div className="flex items-center space-x-2 ml-auto">
      <Link
        href="/cart"
        className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
      >
        <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
        <span className="hidden lg:inline ml-1">
          Cart (<b>{count}</b>)
        </span>
      </Link>
      {currentUser ? (
        <Link href="/me">
          <div className="flex items-center space-x-3 cursor-pointer">
            <Image
              alt="avatar"
              height="40"
              width="40"
              className="w-10 h-10 rounded-full"
              src="/avatar.jpeg"
            />
            <div className="space-y-1 font-medium">
              <p>
                {currentUser.name}
                <p className="block text-sm text-gray-500 dark:text-gray-400">
                  {currentUser.email}
                </p>
              </p>
            </div>
          </div>
        </Link>
      ) : (
        <Link
          href="/singin"
          className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
        >
          <i className="text-gray-400 w-5 fa fa-user"></i>
          <span className="hidden lg:inline ml-1">Singin</span>
        </Link>
      )}
    </div>
  );
}
