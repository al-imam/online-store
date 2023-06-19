"use client";

import Pagination from "$components/layout/Pagination";
import OrderItem from "$components/order/OrderItem";
import useAuth from "$context/AuthProvider";
import { clear } from "$store/index";
import { OrderResponse } from "$types/OrderInterface";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

interface OderProps {
  data: OrderResponse;
}

export default function ({ data }: OderProps) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const qp = new URLSearchParams(window.location.search);
    if (
      currentUser &&
      qp.get("success") === "true" &&
      currentUser._id.toString() === qp.get("id")
    ) {
      dispatch(clear());
      router.replace("/me/orders");
    }
  }, []);

  return (
    <Fragment>
      <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
      {data.orders.map((order) => (
        <OrderItem key={order._id} order={order} />
      ))}

      <Pagination single={data.single} total={data.count} path="me/orders" />
    </Fragment>
  );
}
