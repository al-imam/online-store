"use client";

import COOKIES from "$utility/COOKIES";
import { Delete } from "$utility/request";
import uuid from "$utility/uuid";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();

  async function onClick() {
    await Delete<{ success: true }>("order", {
      headers: { Authorization: `Bearer ${getCookie(COOKIES)}` },
    });

    router.replace(`/me/admin/customer-orders?id=${uuid()}`);
  }

  return (
    <button
      onClick={onClick}
      className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
    >
      <i className="fa fa-trash" aria-hidden="true"></i>
    </button>
  );
}
