import Shipping from "$components/cart/Shipping";
import AddressInterface from "$types/AddressInterface";
import Prettify from "$types/Prettify";
import COOKIES from "$utility/COOKIES";
import { Get } from "$utility/request";
import { cookies } from "next/headers";

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

  return <Shipping addresses={data} />;
}
