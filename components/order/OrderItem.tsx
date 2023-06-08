import Image from "next/image";
import { Order } from "@/types/OrderInterface";

interface OrderItemProps {
  order: Order;
}

export default function ({ order }: OrderItemProps) {
  return (
    <article className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md">
      <header className="lg:flex justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <p className="font-semibold">
            <span>Order ID: {order._id} </span>
            <span
              className={` ${
                order.status == "Processing" ? "text-red-500" : "text-green-500"
              }`}
            >
              • {order.status.toUpperCase()}
            </span>
          </p>
          <p className="text-gray-500">{order.created.substring(0, 10)} </p>
        </div>
      </header>
      <div className="grid md:grid-cols-3 gap-2">
        <div>
          <p className="text-gray-400 mb-1">Person</p>
          <ul className="text-gray-600">
            <li>user name</li>
            <li>Phone: 02384236</li>
            <li>Email: alimam@gmail.com</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Delivery address</p>
          <ul className="text-gray-600">
            <li>{order.address.street}</li>
            <li>
              {order.address.city}, {order.address.state},{order.address.zip}
            </li>
            <li>{order.address.country}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Payment</p>
          <ul className="text-gray-600">
            <li className="text-green-400">
              {order.payment.status.toUpperCase()}
            </li>
            <li>Tax paid: ${order.payment.tax}</li>
            <li>Total paid: ${order.payment.amount}</li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {order.order.map((item) => (
          <figure className="flex flex-row mb-4">
            <div>
              <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
                <Image
                  src={item.imageURL}
                  height="60"
                  width="60"
                  alt={item.name}
                />
              </div>
            </div>
            <figcaption className="ml-3">
              <p>{item.name.substring(0, 35)}</p>
              <p className="mt-1 font-semibold">
                {item.quantity}x = ${item.price * item.quantity}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
}
