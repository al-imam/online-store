"use client";

import { compute, useSelector } from "$store/index";
import round from "$utility/round";
import Link from "next/link";

export default function () {
  const { tax, totalWithTax, unit, total } = useSelector(compute);

  return (
    <aside className="md:w-1/4">
      <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
        <ul className="mb-5">
          <li className="flex justify-between text-gray-600  mb-1">
            <span>Total price:</span>
            <span>${round(total)}</span>
          </li>
          <li className="flex justify-between text-gray-600  mb-1">
            <span>Total Units:</span>
            <span className="text-green-500">{round(unit)} (Units)</span>
          </li>
          <li className="flex justify-between text-gray-600  mb-1">
            <span>TAX:</span>
            <span>${round(tax)}</span>
          </li>
          <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
            <span>Total price:</span>
            <span>${round(totalWithTax)}</span>
          </li>
        </ul>

        <Link
          href="/shipping"
          className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
        >
          Continue
        </Link>

        <Link
          href="/"
          className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
        >
          Back to shop
        </Link>
      </article>
    </aside>
  );
}
