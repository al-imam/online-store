import Me from "$components/auth/Me";
import AddressInterface from "$types/AddressInterface";
import COOKIES from "$utility/COOKIES";
import { Get } from "$utility/request";
import { cookies } from "next/headers";

export default async function ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const jwt = cookies().get(COOKIES)?.value;

  const { data } = await Get<(AddressInterface & { _id: string })[]>(
    `address?id=${searchParams.id}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return <Me addresses={data} />;
}
