import Order from "$components/order/Order";
import { OrderResponse } from "$types/OrderInterface";
import COOKIES from "$utility/COOKIES";
import { Get } from "$utility/request";
import { cookies } from "next/headers";

export default async function ({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  const jwt = cookies().get(COOKIES)?.value;

  const { data } = await Get<OrderResponse>(
    `order/get-orders?page=${searchParams.page}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return <Order data={data} />;
}
