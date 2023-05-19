import { Get } from "@/utility/request";
import ServerResponse from "@/types/productInterface";
import ListProduct from "@/components/products/ListProduct";
import QueryInterface from "@/types/queryInterface";
import stringifyQuery from "@/utility/stringifyQuery";

interface HomeProps {
  searchParams: Partial<QueryInterface>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { data } = await Get<ServerResponse[]>(
    `product/?${stringifyQuery(searchParams)}`
  );

  return <ListProduct data={data} />;
}
