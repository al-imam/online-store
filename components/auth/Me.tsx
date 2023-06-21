"use client";

import Addresses from "$components/user/Addresses";
import { Avatar } from "$components/utility";
import useAuth from "$context/AuthProvider";
import AddressInterface from "$types/AddressInterface";
import Link from "next/link";
import { Fragment } from "react";

const time = new Intl.DateTimeFormat("en", {
  dateStyle: "long",
});

interface MeProps {
  addresses: (AddressInterface & { _id: string })[];
}

export default function ({ addresses }: MeProps) {
  const { currentUser } = useAuth();

  return currentUser ? (
    <Fragment>
      <figure className="flex items-center" style={{ gap: 8 }}>
        <div>
          <Avatar />
        </div>
        <figcaption>
          <h5 className="text-gray-950 text-lg">{currentUser?.name}</h5>
          <div>
            <p>Email: {currentUser.email}</p>
            <p>Joined On: {time.format(new Date(currentUser.created))}</p>
          </div>
        </figcaption>
      </figure>

      <hr className="my-4" />

      <Addresses addresses={addresses} />

      <Link href="/me/address/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 fa fa-plus"></i> Add new address
        </button>
      </Link>

      <hr className="my-4" />
    </Fragment>
  ) : null;
}
