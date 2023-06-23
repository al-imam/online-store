"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "$svg/icons";
import { useRouter, useSearchParams } from "next/navigation";
import ReactJsPagination from "react-js-pagination";

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
      nextPageText={<ArrowRightIcon className="h-3 w-3" />}
      prevPageText={<ArrowLeftIcon className="h-3 w-3" />}
      itemClassNext="inline-flex items-center justify-center"
      itemClassPrev="inline-flex items-center justify-center"
      itemClass="block h-8 w-8 rounded border border-gray-100 text-center leading-8 cursor-pointer"
      activeClass="border-black bg-black text-white"
      hideFirstLastPages={true}
    />
  );
}
