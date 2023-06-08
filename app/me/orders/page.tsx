import Order from "@/components/order/Order";
import COOKIES from "@/utility/COOKIES";
import { Get } from "@/utility/request";
import { cookies } from "next/headers";
import { OrderResponse } from "@/types/OrderInterface";

export default async function () {
  const jwt = cookies().get(COOKIES)?.value;

  const { data } = await Get<OrderResponse>("order/get-orders", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return <Order data={data} />;
}
