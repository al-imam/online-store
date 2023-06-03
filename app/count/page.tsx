"use client";

import { useCounter } from "@/store/useCart";

export default function () {
  const { add, count, sub, counts } = useCounter();

  return (
    <div className="p-10 font-sans">
      <p className="px-4">{count}</p>
      <p className="px-4">{JSON.stringify(counts)}</p>
      <button className="block px-4 rounded-md to-blue-600" onClick={add}>
        add
      </button>
      <button className="block px-4 rounded-md to-blue-600" onClick={sub}>
        subtract
      </button>
    </div>
  );
}
