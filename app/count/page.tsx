"use client";

import { useCounter } from "@/store/useCart";

export default function () {
  const { add, count, sub } = useCounter();

  return (
    <div>
      <p>{count}</p>
      <button onClick={add}>add</button>
      <button onClick={sub}>subtract</button>
    </div>
  );
}
