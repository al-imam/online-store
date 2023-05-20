"use client";

import React from "react";
import StarRating from "@/components/utility/StarRating";
import useObjectStore from "use-object-store";
import { useRouter } from "next/navigation";

const categories = ["Electronics", "Laptops", "Toys", "Office", "Beauty"];
const prices = [
  { ui: "Min", store: "min" },
  { ui: "Max", store: "max" },
] as const;

type SN = string | null;

interface Store {
  category: SN;
  rating: SN;
  min: number | undefined;
  max: number | undefined;
}

type FixQueryProblem = { rating: SN } | { category: SN };

const Filters = () => {
  const router = useRouter();
  const [store, updateStore] = useObjectStore<Store>({
    category: null,
    rating: null,
    max: undefined,
    min: undefined,
  });

  function changeQuery(select: string, query: "category" | "rating") {
    const qp = new URLSearchParams(window.location.search);

    if (select === store[query]) {
      updateStore({ [query]: null } as FixQueryProblem);
      qp.delete(query);
    } else {
      updateStore({ [query]: select } as FixQueryProblem);
      qp.set(query, select.toLowerCase());
    }

    router.push(`/?${qp.toString()}`);
  }

  const minmax = {
    min(number: number) {
      if (isNaN(number)) updateStore({ min: undefined });
      updateStore({ min: number });
    },

    max(number: number) {
      if (isNaN(number)) updateStore({ max: undefined });
      updateStore({ max: number });
    },
  };

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <a
        className="md:hidden mb-5  w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
        href="#"
      >
        Filter by
      </a>
      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Price ($)</h3>
        <div className="grid md:grid-cols-3 gap-x-2">
          {prices.map((v) => (
            <div className="mb-4">
              <input
                name={v.store}
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="number"
                onChange={(e) => minmax[v.store](e.target.valueAsNumber)}
                value={store[v.store]}
                placeholder={v.ui}
              />
            </div>
          ))}

          <div className="mb-4">
            <button className="px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
              Go
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Category</h3>

        <ul className="space-y-1">
          {categories.map((category) => (
            <li>
              <label className="flex items-center">
                <input
                  onChange={(e) => changeQuery(e.target.value, "category")}
                  name="category"
                  type="checkbox"
                  value={category}
                  className="h-4 w-4"
                  checked={store.category === category}
                />
                <span className="ml-2 text-gray-500"> {category} </span>
              </label>
            </li>
          ))}
        </ul>

        <hr className="my-4" />

        <h3 className="font-semibold mb-2">Ratings</h3>
        <ul className="space-y-1">
          <li>
            {["5", "4", "3", "2", "1"].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  name="ratings"
                  type="checkbox"
                  value={rating}
                  className="h-4 w-4"
                  onChange={(e) => changeQuery(e.target.value, "rating")}
                  checked={store.rating === rating}
                />
                <span className="ml-2 text-gray-500">
                  <StarRating
                    rating={parseInt(rating)}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                </span>
              </label>
            ))}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Filters;
