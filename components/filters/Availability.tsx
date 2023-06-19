"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function () {
  const router = useRouter();

  const [availability, setAvailability] = useState<
    "available" | "unavailable" | null
  >(null);

  function changeQuery(select: "available" | "unavailable") {
    const qp = new URLSearchParams(window.location.search);

    console.log(select, availability, select === availability);

    if (select === availability) {
      setAvailability(null);
      qp.delete("availability");
    } else {
      setAvailability(select);
      qp.set("availability", select.toLowerCase());
    }

    qp.delete("page");
    qp.set("page", "1");

    router.push(`/?${qp.toString()}`);
  }

  useEffect(() => {
    const qp = new URLSearchParams(window.location.search);
    const at = qp.get("availability");
    if (at && ["available", "unavailable"].includes(at)) {
      setAvailability(at as "available" | "unavailable");
    }
  }, []);

  return (
    <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
        <span className="text-sm font-medium"> Availability </span>

        <span className="transition group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </summary>

      <div className="border-t border-gray-200 bg-white">
        <header className="flex items-center justify-between p-4">
          <span className="text-sm text-gray-700 select-none">
            {availability
              ? availability === "available"
                ? "In stock"
                : "Out of stock"
              : "Not selected"}
          </span>

          <button
            type="button"
            onClick={() => changeQuery(availability as any)}
            className="text-sm text-gray-900 underline underline-offset-4 select-none"
          >
            Reset
          </button>
        </header>

        <ul className="space-y-1 border-t border-gray-200 p-4">
          <li>
            <label
              htmlFor="filter-in-stock"
              className="inline-flex items-center gap-2"
            >
              <input
                type="radio"
                name="availability"
                id="filter-in-stock"
                value="available"
                checked={"available" === availability}
                onChange={(e) => changeQuery(e.target.value as "available")}
                className="form-radio h-5 w-5 rounded border-gray-300"
              />

              <span className="text-sm font-medium text-gray-700 select-none">
                In Stock (5+)
              </span>
            </label>
          </li>

          <li>
            <label
              htmlFor="filter-out-of-stock"
              className="inline-flex items-center gap-2"
            >
              <input
                type="radio"
                id="filter-out-of-stock"
                value="unavailable"
                checked={"unavailable" === availability}
                onChange={(e) => changeQuery(e.target.value as "unavailable")}
                name="availability"
                className="form-radio h-5 w-5 rounded border-gray-300"
              />

              <span className="text-sm font-medium text-gray-700 select-none">
                Out of Stock (10+)
              </span>
            </label>
          </li>
        </ul>
      </div>
    </details>
  );
}
