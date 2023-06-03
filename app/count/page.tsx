"use client";

import { useCounter } from "@/store/useCart";

export default function () {
  const { total, items } = useCounter();

  return (
    <div className="p-10 font-sans">
      <p className="px-4">{total}</p>
      <p className="px-4">{JSON.stringify(items)}</p>
      <button className="block px-4 rounded-md to-blue-600">add</button>
      <button className="block px-4 rounded-md to-blue-600">subtract</button>
    </div>
  );
}
