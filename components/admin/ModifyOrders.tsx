import { Order, OrderDetails } from "@/types/OrderInterface";
import round from "@/utility/round";
import ModifyOrderForm from "./ModifyOrderForm";

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

      <ModifyOrderForm id={order._id} init={order.status} />
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
