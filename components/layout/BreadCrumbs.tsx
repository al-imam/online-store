import Link from "next/link";

interface BreadCrumbsProps {
  list: {
    name: string;
    url: string;
  }[];
}

const BreadCrumbs = ({ list }: BreadCrumbsProps) => (
  <section className="py-5 sm:py-7 bg-blue-100">
    <div className="container max-w-screen-xl mx-auto px-4">
      <ol className="inline-flex flex-wrap text-gray-600 space-x-1 md:space-x-3 items-center">
        <li className="inline-flex items-center">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <i className="ml-3 text-gray-400 fa fa-chevron-right"></i>
        </li>
      </ol>
    </div>
  </section>
);

export default BreadCrumbs;
