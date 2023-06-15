"use client";

import { useRouter } from "next/navigation";
import { useEffect, ChangeEvent } from "react";
import useObjectStore from "use-object-store";

const num = /(^\d*\.?\d*[0-9]+\d*$)|(^[0-9]+\d*\.\d*$)/;

export default function () {
  const [{ min, max }, dispatch] = useObjectStore({ min: "", max: "" });
  const router = useRouter();

  useEffect(() => {
    const qp = new URLSearchParams(window.location.search);

    if (qp.get("min") !== null) {
      const min = parseFloat(qp.get("min") as any);
      if (!isNaN(min)) dispatch({ min: min.toString() });
    }

    if (qp.get("max") !== null) {
      const max = parseFloat(qp.get("max") as any);
      if (!isNaN(max)) dispatch({ max: max.toString() });
    }
  }, []);

  function changePriceQuery(min: string, max: string) {
    const qp = new URLSearchParams(window.location.search);

    const p = (name: string) => parseInt(qp.get("min")!) || "";
    const changePage = min !== p("min") || max !== p("max");

    if (min) {
      qp.set("min", min);
    } else {
      qp.delete("min");
    }

    if (max) {
      qp.set("max", max);
    } else {
      qp.delete("max");
    }

    if (changePage) {
      qp.delete("page");
      qp.set("page", "1");
    }

    router.push(`/?${qp.toString()}`);
  }

  function reset() {
    dispatch({ min: "", max: "" });
    const qp = new URLSearchParams(window.location.search);
    qp.delete("min");
    qp.delete("max");
    router.push(`/?${qp.toString()}`);
  }

  function validateNumber(callback: (value: string) => void) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "" || num.test(e.target.value)) {
        callback(e.target.value);
      }
    };
  }

  return (
    <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
        <span className="text-sm font-medium"> Price </span>

        <span className="transition group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </summary>

      <div className="border-t border-gray-200 bg-white">
        <header className="flex items-center justify-between p-4">
          <span className="text-sm text-gray-700">
            The highest price is $6000
          </span>

          <button
            type="button"
            onClick={reset}
            className="text-sm text-gray-900 underline underline-offset-4"
          >
            Reset
          </button>
        </header>

        <div className="border-t border-gray-200 p-4">
          <div className="flex justify-between gap-4">
            <label
              htmlFor="filter-price-from"
              className="flex items-center gap-2"
            >
              <span className="text-sm text-gray-600">$</span>

              <input
                type="number"
                id="filter-price-from"
                placeholder="From"
                className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm form-input"
                value={min}
                onChange={validateNumber((value) => {
                  dispatch({ min: value });
                  changePriceQuery(value, max);
                })}
              />
            </label>

            <label
              htmlFor="filter-price-to"
              className="flex items-center gap-2"
            >
              <span className="text-sm text-gray-600">$</span>

              <input
                type="number"
                id="filter-price-to"
                placeholder="To"
                className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm form-input"
                value={max}
                onChange={validateNumber((value) => {
                  dispatch({ max: value });
                  changePriceQuery(min, value);
                })}
              />
            </label>
          </div>
        </div>
      </div>
    </details>
  );
}
