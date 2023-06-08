"use client";

import Pagination from "@/components/layout/Pagination";
import OrderItem from "@/components/order/OrderItem";
import useAuth from "@/context/AuthProvider";
import useCart from "@/store/useCart";
import { OrderResponse } from "@/types/OrderInterface";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

interface OderProps {
  data: OrderResponse;
}

export default function ({ data }: OderProps) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const clearItems = useCart((store) => store.clearItems);
  const sp = useSearchParams();

  useEffect(() => {
    if (
      sp &&
      currentUser &&
      sp.get("success") === "true" &&
      currentUser._id.toString() === sp.get("id")
    ) {
      clearItems();
      router.replace(`/me/orders`);
    }
  }, []);

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
