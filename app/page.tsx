import { Get } from "@/utility/request";
import ServerResponse from "@/types/productInterface";
import ListProduct from "@/components/products/ListProduct";
import QueryInterface from "@/types/queryInterface";
import stringifyQuery from "@/utility/stringifyQuery";

interface HomeProps {
  searchParams: Partial<QueryInterface>;
}

interface DATA {
  total: number;
  single: number;
  products: ServerResponse[];
}

export default async function Home({ searchParams }: HomeProps) {
  const { data } = await Get<DATA>(`product/?${stringifyQuery(searchParams)}`);

  return <ListProduct data={data} />;
}
