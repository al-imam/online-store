import ListProduct from "$components/products/ListProduct";
import ProductInterface from "$types/productInterface";
import { QueryInterface } from "$types/queryInterface";
import { Get } from "$utility/request";
import stringifyQuery from "$utility/stringifyQuery";

interface HomeProps {
  searchParams: Partial<QueryInterface>;
}

interface DATA {
  count: number;
  single: number;
  products: ProductInterface[];
}

export default async function ({ searchParams }: HomeProps) {
  const { data } = await Get<DATA>(`product/?${stringifyQuery(searchParams)}`);

  return <ListProduct data={data} />;
}
