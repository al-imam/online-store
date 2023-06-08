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

function Pagination({ total, single, path = "" }: PaginationProps) {
  const sp = useSearchParams();
  const router = useRouter();

  const page = parseInteger(sp?.get("page") as string);

  function changePage(nextPage: number) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", nextPage.toString());
    router.push(`/${path}?${queryParams.toString()}`);
  }

  return (
    <div className="flex mt-20 justify-center">
      <ReactJsPagination
        activePage={page}
        itemsCountPerPage={single}
        totalItemsCount={total}
        onChange={changePage}
        nextPageText="Next"
        prevPageText="Prev"
        itemClass="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        activeLinkClass="z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focus:z-20"
        activeClass="z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focus:z-20"
      />
    </div>
  );
}

export default Pagination;
