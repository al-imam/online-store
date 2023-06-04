import Shipping from "@/components/cart/Shipping";
import { Get } from "@/utility/request";
import { cookies } from "next/headers";
import COOKIES from "@/utility/COOKIES";
import AddressInterface from "@/types/AddressInterface";
import Prettify from "@/types/Prettify";

export default async function () {
  const jwt = cookies().get(COOKIES)?.value;

  const { data } = await Get<Prettify<AddressInterface & { _id: string }>[]>(
    "address",
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

export default function () {
  return <Shipping />;
}
