"use client";

import Link from "next/link";
import AddressCheckBox from "@/components/cart/AddressCheckBox";
import ShippingItem from "@/components/cart/ShippingItem";
import useCart from "@/store/useCart";
import round from "@/utility/round";

export default function () {
  const { tax, totalWithTax, items, total } = useCart((store) => store);

  return (
    <div>
      <section className="py-10 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
            <main className="md:w-2/3">
              <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
                <h2 className="text-xl font-semibold mb-5">
                  Shipping information
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {Array(5)
                    .fill(null)
                    .map(() => (
                      <AddressCheckBox />
                    ))}
                </div>

                <Link
                  href="/me/address/new"
                  className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  <i className="mr-1 fa fa-plus"></i> Add new address
                </Link>

                <div className="flex justify-end space-x-2 mt-10">
                  <Link
                    href="/cart"
                    className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                  >
                    Back
                  </Link>
                  <a className="px-5 py-2 inline-block text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer">
                    Checkout
                  </a>
                </div>
              </article>
            </main>
            <aside className="md:w-1/3">
              <article className="text-gray-600" style={{ maxWidth: "350px" }}>
                <h2 className="text-lg font-semibold mb-3">Summary</h2>
                <ul>
                  <li className="flex justify-between mb-1">
                    <span>Amount:</span>
                    <span>${round(total)}</span>
                  </li>
                  <li className="flex justify-between mb-1">
                    <span>Est TAX:</span>
                    <span>${round(tax)}</span>
                  </li>
                  <li className="border-t flex justify-between mt-3 pt-3">
                    <span>Total Amount:</span>
                    <span className="text-gray-900 font-bold">
                      ${round(totalWithTax)}
                    </span>
                  </li>
                </ul>

                <hr className="my-4" />

                <h2 className="text-lg font-semibold mb-3">Items in cart</h2>

                {Array(5)
                  .fill(null)
                  .map(() => (
                    <ShippingItem />
                  ))}
              </article>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
