import Link from "next/link";
import Search from "@/components/layout/Search";
import Image from "next/image";
import CartLink from "@/components/utility/CartLink";

const Header = () => (
  <header className="bg-white py-2 border-b">
    <div className="container max-w-screen-xl mx-auto px-4">
      <div className="flex flex-wrap items-center">
        <div className="flex-shrink-0 mr-5">
          <Link href="/">
            <span className="text-gray-700 text-xl">store</span>
          </Link>
        </div>
        <Search />

        <div className="flex items-center space-x-2 ml-auto">
          <CartLink />
          <Link
            href="/singup"
            className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
          >
            <i className="text-gray-400 w-5 fa fa-user"></i>
            <span className="hidden lg:inline ml-1">singup</span>
          </Link>
          <Link href="/me">
            <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
              <Image
                alt="avatar"
                height="40"
                width="40"
                className="w-10 h-10 rounded-full"
                src="/avatar.jpeg"
              />
              <div className="space-y-1 font-medium">
                <p>
                  Nirob
                  <time className="block text-sm text-gray-500 dark:text-gray-400">
                    alimam01828@gmail.com
                  </time>
                </p>
              </div>
            </div>
          </Link>
        </div>

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
