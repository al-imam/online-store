"use client";

import ReactJsPagination from "react-js-pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  total: number;
  single: number;
  path?: string;
}

function parseInteger(str: string, fallback = 1) {
  const num = parseInt(str);
  if (!isNaN(num)) return num;
  return fallback;
}

export default function ({ total, single, path = "" }: PaginationProps) {
  const sp = useSearchParams();
  const router = useRouter();

  const page = parseInteger(sp?.get("page") as string);

  function changePage(nextPage: number) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", nextPage.toString());
    router.push(`/${path}?${queryParams.toString()}`);
  }

  return (
    <ReactJsPagination
      activePage={page}
      itemsCountPerPage={single}
      totalItemsCount={total}
      onChange={changePage}
      innerClass="flex justify-center gap-1 text-xs font-medium"
      nextPageText={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      }
      prevPageText={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      }
      itemClassNext="inline-flex items-center justify-center"
      itemClassPrev="inline-flex items-center justify-center"
      itemClass="block h-8 w-8 rounded border border-gray-100 text-center leading-8 cursor-pointer"
      activeClass="border-black bg-black text-white"
      hideFirstLastPages={true}
    />
  );
}
