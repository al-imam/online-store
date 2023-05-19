"use client";

import ReactJsPagination from "react-js-pagination";

interface PaginationProps {
  total: number;
  single: number;
}

function Pagination({ total, single }: PaginationProps) {
  return (
    <div className="flex mt-20 justify-center">
      <ReactJsPagination
        activePage={1}
        itemsCountPerPage={single}
        totalItemsCount={total}
        onChange={() => {}}
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
