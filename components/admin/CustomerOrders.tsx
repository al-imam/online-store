import Link from "next/link";
import { Fragment } from "react";
import Pagination from "../layout/Pagination";
import { Order, OrderResponse } from "@/types/OrderInterface";

interface CustomerOrdersProps {
  data: OrderResponse;
}

export default function ({ data }: CustomerOrdersProps) {
  return (
    <Fragment>
      <h1 className="text-3xl my-5 ml-4 font-bold">12 Orders</h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Amount Paid
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.orders.map((order) => (
            <TR data={order} />
          ))}
        </tbody>
      </table>
      <div className="mb-6">
        <Pagination
          single={data.single}
          total={data.count}
          path="me/admin/customer-orders"
        />
      </div>
    </Fragment>
  );
}

function TR({ data }: { data: Order }) {
  return (
    <tr className="bg-white">
      <td className="px-6 py-2">{data.payment.id}</td>
      <td className="px-6 py-2">${data.payment.amount}</td>
      <td className="px-6 py-2">{data.status}</td>
      <td className="px-6 py-2">
        <div>
          <Link
            href={`/admin/orders/12345667`}
            className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
          >
            <i className="fa fa-edit" aria-hidden="true"></i>
          </Link>
          <a className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
            <i className="fa fa-trash" aria-hidden="true"></i>
          </a>
        </div>
      </td>
    </tr>
  );
}
