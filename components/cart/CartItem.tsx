import CartItemInterface from "@/types/cartItemInterface";

function calculate(price: number, quantity: number) {
  const total = quantity * price;
  if (total.toString().includes(".")) {
    return total.toFixed(2);
  }
  return total;
}

const CartItem = ({ item }: { item: CartItemInterface }) => {
  return (
    <div>
      <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
        <div className="w-full lg:w-2/5 xl:w-2/4">
          <figure className="flex leading-5">
            <div>
              <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                <img src={item.imageURL} alt={item.name} />
              </div>
            </div>
            <figcaption className="ml-3">
              <p>
                <a href="#" className="hover:text-blue-600">
                  {item.name}
                </a>
              </p>
              <p className="mt-1 text-gray-400"> Seller: {item.seller}</p>
            </figcaption>
          </figure>
        </div>
        <div className="w-24">
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button
              data-action="decrement"
              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
            >
              <span className="m-auto text-2xl font-thin">-</span>
            </button>
            <input
              type="number"
              className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  custom-input-number"
              name="custom-input-number"
              value={0}
              readOnly
            ></input>
            <button
              data-action="increment"
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
            >
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>
        <div>
          <div className="leading-5">
            <p className="font-semibold not-italic">
              ${calculate(item.quantity, item.price)}
            </p>
            <small className="text-gray-400">${item.price} / per item</small>
          </div>
        </div>
        <div className="flex-auto">
          <div className="float-right">
            <a className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
              Remove
            </a>
          </div>
        </div>
      </div>

      <hr className="my-4" />
    </div>
  );
};

export default CartItem;
