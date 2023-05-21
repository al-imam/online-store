"use client";

import CartItemInterface from "@/types/cartItemInterface";
import useCart from "@/store/useCart";

interface QuantityProps {
  item: CartItemInterface;
}

const Quantity = ({ item }: QuantityProps) => {
  const [add, remove] = useCart((store) => [
    store.addQuantity,
    store.removeQuantity,
  ]);

  return (
    <div className="w-24">
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          onClick={() => remove(item)}
          className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span className="m-auto text-2xl font-thin">-</span>
        </button>
        <input
          type="number"
          className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  custom-input-number"
          name="custom-input-number"
          value={item.quantity}
          readOnly
        />
        <button
          onClick={() => add(item)}
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
};

export default Quantity;
