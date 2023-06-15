import CustomerOrders from "@/components/admin/CustomerOrders";
import ModifyOrders from "@/components/admin/ModifyOrders";
import { OrderResponse } from "@/types/OrderInterface";
import COOKIES from "@/utility/COOKIES";
import { Get } from "@/utility/request";
import { cookies } from "next/headers";

interface Props {
  params: Record<string, string>;
}

export default async function ({ params }: Props) {
  // const page = params.page ?? 1;
  // const jwt = cookies().get(COOKIES)?.value;

  // const { data } = await Get<OrderResponse>(
  //   `order/customer-orders?docs-per-page=5&page=${page}`,
  //   { headers: { Authorization: `Bearer ${jwt}` } }
  // );

  return <ModifyOrders />;
}
