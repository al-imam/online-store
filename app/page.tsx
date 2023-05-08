import { Get } from "@/utility/request";
import ServerResponse from "@/types/productInterface";

export default async function Home() {
  const { data } = await Get<ServerResponse>("product");

  return <main>{JSON.stringify(data)}</main>;
}
