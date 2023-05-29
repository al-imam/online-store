import Me from "@/components/auth/Me";
import { Get } from "@/utility/request";
import AddressInterface from "@/types/AddressInterface";
import { cookies } from "next/headers";
import COOKIES from "@/utility/COOKIES";

export default async function () {
  const jwt = cookies().get(COOKIES)?.value;

  const { data } = await Get<(AddressInterface & { _id: string })[]>(
    "address",
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return <Me addresses={data} />;
}
