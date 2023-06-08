import Pagination from "@/components/layout/Pagination";
import OrderItem from "@/components/order/OrderItem";
import { OrderResponse } from "@/types/OrderInterface";

interface OderProps {
  data: OrderResponse;
}

export default function ({ data }: OderProps) {
  return (
    <>
      <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
      {data.orders.map((order) => (
        <OrderItem key={order._id} order={order} />
      ))}

      <Pagination single={data.single} total={data.count} path="me/orders" />
    </>
  );
}
