import { Order, OrderDetails } from "@/types/OrderInterface";
import round from "@/utility/round";

export default function ({ order }: { order: Order }) {
  return (
    <article className="p-3 lg:p-5 bg-white border border-blue-600 rounded-md">
      <header className="lg:flex justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <p className="font-semibold">
            <span>Order ID: 938759485 </span>

            <span
              className={
                order.status === "processing"
                  ? "text-red-500"
                  : order.status === "shipped"
                  ? "text-yellow-500"
                  : "text-green-500"
              }
            >
              • {order.status}
            </span>
          </p>
          <p className="text-gray-500"> {order.created.substring(0, 10)} </p>
        </div>
      </header>
      <div className="grid md:grid-cols-3 gap-2">
        <div>
          <p className="text-gray-400 mb-1">Person</p>
          <ul className="text-gray-600">
            <li>{order.user.name}</li>
            <li>Phone: {order.address.phone}</li>
            <li>Email: {order.user.email}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Delivery address</p>
          <ul className="text-gray-600">
            <li>124 street</li>
            <li>Orlando, FL, 12345</li>
            <li>US</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Payment</p>
          <ul className="text-gray-600">
            <li className="text-green-400">PAID</li>
            <li>Tax paid: ${order.payment.tax}</li>
            <li>Total paid: ${order.payment.amount}</li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {order.order.map((o) => (
          <OrderItem order={o} />
        ))}
      </div>

      <hr />

      <form className="mt-6 space-y-4">
        <label className="block"> Update Order Status </label>
        <div className="relative">
          <select
            className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            name="category"
            value={order.status}
            required
          >
            {["processing", "shipped", "delivered"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
            <svg
              width="22"
              height="22"
              className="fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M7 10l5 5 5-5H7z"></path>
            </svg>
          </i>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </article>
  );
}

function OrderItem({ order }: { order: OrderDetails }) {
  return (
    <figure className="flex flex-row mb-4">
      <div>
        <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
          <img src={order.imageURL} height="60" width="60" alt="Title" />
        </div>
      </div>
      <figcaption className="ml-3">
        <p>{order.name}</p>
        <p className="mt-1 font-semibold">
          {order.quantity}x = ${round(order.quantity * order.price)}
        </p>
      </figcaption>
    </figure>
  );
}
