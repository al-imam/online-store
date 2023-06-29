import { Accordion } from "$components/accordion";
import Pagination from "$components/layout/Pagination";
import { Product } from "$components/products";
import ProductInterface from "$types/productInterface";

interface ListProductProps {
  data: { products: ProductInterface[]; count: number; single: number };
}

export default ({ data }: ListProductProps) => (
  <section className="mx-auto max-w-screen-xl px-4 py-2 ">
    <div className="block lg:hidden py-2 mb-6">
      <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
        <span className="text-sm font-medium"> Filters & Sorting </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4 rtl:rotate-180"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>

    <div className="lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
      <div className="hidden lg:block lg:h-[calc(100vh-calc(var(--nav-size)+3rem))] overflow-y-scroll remove-scroll-bar pb-4">
        <p className="block text-xs font-medium text-gray-700 mb-4">Filters</p>
        <Accordion />
      </div>
      <div className="lg:col-span-3">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.products.map((item) => (
            <Product item={item} key={item._id} />
          ))}
        </ul>
        <div className="mt-8">
          <Pagination total={data.count} single={data.single} />
        </div>
      </div>
    </div>
  </section>
);
