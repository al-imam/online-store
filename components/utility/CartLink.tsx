"use client";

import Link from "next/link";
import useCart from "@/store/useCart";

const CartLink = () => {
  const count = useCart((store) => store.items).length;

  return (
    <Link
      href="/cart"
      className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
    >
      <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
      <span className="hidden lg:inline ml-1">
        Cart (<b>{count}</b>)
      </span>
    </Link>
  );
};

export default CartLink;
