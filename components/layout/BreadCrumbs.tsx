import { ArrowRightIcon, HomeIcon } from "$svg/icons";
import Link from "next/link";

interface BreadCrumbsProps {
  list: {
    name: string;
    url: string;
  }[];
}

export default function ({ list }: BreadCrumbsProps) {
  return (
    <nav aria-label="breadcrumb" className="py-8">
      <ol className="flex items-center gap-1 text-base text-gray-700 max-w-screen-xl mx-auto px-4">
        <li className="flex gap-1 items-center justify-center">
          <Link href="/" className="block transition hover:text-blue-600">
            <span className="sr-only"> Home </span>
            <HomeIcon className="h-5 w-5" />
          </Link>
          <ArrowRightIcon className="h-4 w-4" />
        </li>

        {list.map((u, i) => (
          <li className="flex gap-1 items-center justify-center" key={u.url}>
            <Link href={u.url} className="block transition hover:text-black">
              {u.name}
            </Link>
            {list.length > i + 1 && <ArrowRightIcon className="h-4 w-4" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
