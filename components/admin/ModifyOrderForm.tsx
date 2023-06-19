"use client";

import COOKIES from "$utility/COOKIES";
import colorLog from "$utility/colorLog";
import { Put } from "$utility/request";
import uuid from "$utility/uuid";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import useObjectStore from "use-object-store";

export default function ({
  init,
  id,
}: {
  init: "processing" | "shipped" | "delivered";
  id: string;
}) {
  const [{ status, loading }, updateStore] = useObjectStore({
    status: init,
    loading: false,
  });

  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await Put<{ success: true }>(
        `order?id=${id}`,
        { status },
        { headers: { Authorization: `Bearer ${getCookie(COOKIES)}` } }
      );
      router.replace(`/me/admin/customer-orders/${id}?id=${uuid()}`);
    } catch (e) {
      colorLog(e);
    } finally {
      updateStore({ loading: false });
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <label className="block"> Update Order Status </label>
      <div className="relative">
        <select
          className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
          name="category"
          value={status}
          onChange={(e) => updateStore({ status: e.target.value as any })}
          required
        >
          {["processing", "shipped", "delivered"].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
          <svg
            width="22"
            height="22"
            className="fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M7 10l5 5 5-5H7z"></path>
          </svg>
        </i>
      </div>
      <button
        disabled={loading}
        type="submit"
        className="px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
      >
        Update
      </button>
    </form>
  );
}
