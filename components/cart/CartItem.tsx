import CartItemInterface from "@/types/cartItemInterface";
import Quantity from "@/components/cart/Quantity";

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
        <Quantity item={item} />
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
