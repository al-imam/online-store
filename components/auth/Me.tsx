"use client";

import Link from "next/link";
import useAuth from "@/context/AuthProvider";
import Avatar from "@/components/utility/Avatar";

export default function () {
  const { currentUser } = useAuth();

  return (
    <>
      <figure className="flex items-center" style={{ gap: 8 }}>
        <div>
          <Avatar />
        </div>
        <figcaption>
          <h5 className="text-gray-950 text-lg">{currentUser?.name}</h5>
          <div>
            <p>Email: {currentUser?.email}</p>
            <p>Joined On: {currentUser?.created}</p>
          </div>
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
