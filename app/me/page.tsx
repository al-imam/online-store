import Me from "@/components/auth/Me";
import { Get } from "@/utility/request";
import AddressInterface from "@/types/AddressInterface";

export default async function () {
  const { data } = await Get<(AddressInterface & { _id: string })[]>("address");

  return <Me addresses={data} />;
}
