import { AddCart } from "$components/utility";
import ProductInterface from "$types/productInterface";
import Link from "next/link";

interface ProductProps {
  item: ProductInterface;
}

export function Product({ item }: ProductProps) {
  return (
    <li className="group relative block overflow-hidden">
      <button className="absolute end-4 top-4 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
        <span className="sr-only">Wishlist</span>

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
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>

      <img
        src={item.images[0] ? item.images[0].url : "/product.png"}
        alt={item.name}
        className="h-64 w-full object-contain transition duration-500 group-hover:scale-105"
      />

      <div className="relative border border-gray-100 bg-white p-6">
        <Link
          href={`/product/${item._id}`}
          className="mt-4 text-base font-medium text-gray-900 line-clamp-1 hover:text-blue-600"
        >
          {item.name}
        </Link>

        <div className="flex items-center justify-between mt-1.5">
          <p className="text-sm text-gray-700">${item.price}</p>

          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
            New
          </span>
        </div>

        <div className="mt-4 z-50">
          <AddCart product={item} />
        </div>
      </div>
    </li>
  );
}
