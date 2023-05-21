"use client";

import TotalPriceInfo from "@/components/cart/TotalPriceInfo";
import useCart from "@/store/useCart";
import CartItem from "@/components/cart/CartItem";

const CartDetails = () => {
  const cartItems = useCart((store) => store.items);

  return (
    <>
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2">
            {cartItems.length} Item(s) in Cart
          </h2>
        </div>
      </section>
      {cartItems.length > 0 && (
        <section className="py-10">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <main className="md:w-3/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  {cartItems.map((item) => (
                    <CartItem item={item} />
                  ))}
                </article>
              </main>
              <TotalPriceInfo />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CartDetails;
