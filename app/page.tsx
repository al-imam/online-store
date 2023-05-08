import { Get } from "@/utility/request";
import ServerResponse from "@/types/productInterface";
import ListProduct from "@/components/products/ListProduct";

export default async function Home() {
  const { data } = await Get<ServerResponse[]>("product");

  return <ListProduct data={data} />;
}
