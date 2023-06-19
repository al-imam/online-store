import CartItemInterface from "$types/cartItemInterface";
import round from "$utility/round";

export default function ({ item }: { item: CartItemInterface }) {
  return (
    <figure className="flex items-center mb-4 leading-5">
      <div>
        <div className="block relative w-20 h-20 rounded p-1 border border-gray-200 ">
          <img className="h-full mx-auto" src={item.imageURL} alt="Title" />
          <span className="absolute -top-2 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center text-white bg-gray-400 rounded-full">
            {item.quantity}
          </span>
        </div>
      </div>
      <figcaption className="ml-3">
        <p>{item.name.substring(0, 90)}</p>
        <p className="mt-1 text-gray-400">
          Total: ${round(item.quantity * item.price)}
        </p>
      </figcaption>
    </figure>
  );
}
