"use client";

import { deleteItem } from "$store/index";
import { useDispatch } from "react-redux";

export default function ({ id }: { id: string }) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(deleteItem(id))}
      className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
    >
      Remove
    </button>
  );
}
