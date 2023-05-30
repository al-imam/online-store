import NewAddress from "@/components/user/NewAddress";
import AddressInterface from "@/types/AddressInterface";
import COOKIES from "@/utility/COOKIES";
import { Get } from "@/utility/request";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ({ params }: { params: Record<string, string> }) {
  const jwt = cookies().get(COOKIES)?.value;

  try {
    const { data } = await Get<AddressInterface & { _id: string }>(
      `address/${params.addressId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return (
      <NewAddress
        {...(data as any)}
        id={params.addressId}
        callback="updateAddress"
        title="Update address"
      />
    );
  } catch {
    redirect("/me");
  }
}
