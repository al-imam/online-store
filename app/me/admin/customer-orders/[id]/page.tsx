import ModifyOrders from "@/components/admin/ModifyOrders";
import { Order } from "@/types/OrderInterface";
import COOKIES from "@/utility/COOKIES";
import { Get } from "@/utility/request";
import { cookies } from "next/headers";

interface Props {
  params: Record<string, string>;
}

export default async function ({ params }: Props) {
  const jwt = cookies().get(COOKIES)?.value;

  const { data } = await Get<Order>(`order?id=${params.id}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return <ModifyOrders order={data} />;
}
