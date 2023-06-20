import Search from "$components/layout/Search";
import HeaderItems from "$components/utility/HeaderItems";
import Link from "next/link";

const Header = () => (
  <header className="bg-white flex h-[var(--nav-size)] items-center border-b ">
    <div className="container max-w-screen-xl mx-auto px-4">
      <div className="flex flex-wrap items-center">
        <div className="flex-shrink-0 mr-5">
          <Link href="/">
            <span className="text-gray-700 text-xl">store</span>
          </Link>
        </div>
        <Search />

        <HeaderItems />

        <div className="lg:hidden ml-2">
          <button
            type="button"
            className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
          >
            <span className="sr-only">Open menu</span>
            <i className="fa fa-bars fa-lg"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
