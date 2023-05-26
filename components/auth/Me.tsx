"use client";

import Link from "next/link";
import useAuth from "@/context/AuthProvider";

export default function () {
  const { currentUser } = useAuth();

  return (
    <>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={
              typeof currentUser?.avatar === "string"
                ? currentUser.avatar
                : "/avatar.png"
            }
            alt={currentUser?.name}
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{currentUser?.name}</h5>
          <p>
            <b>Email:</b> {currentUser?.email} | <b>Joined On:</b>
            {currentUser?.created}
          </p>
        </figcaption>
      </figure>

      <hr className="my-4" />

      <Link href="/address/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 fa fa-plus"></i> Add new address
        </button>
      </Link>

      <hr className="my-4" />
    </>
  );
}
