import ProductTable from "$components/admin/ProductTable";
import ProductInterface from "$types/productInterface";
import COOKIES from "$utility/COOKIES";
import { Get } from "$utility/request";
import { cookies } from "next/headers";

interface DATA {
  count: number;
  single: number;
  products: ProductInterface[];
}

interface Props {
  searchParams: Record<string, string>;
}

export default async function ({ searchParams }: Props) {
  const page = searchParams.page ?? 1;
  const jwt = cookies().get(COOKIES)?.value;

  const { data } = await Get<DATA>(`my/products?docs-per-page=5&page=${page}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return <ProductTable data={data} />;
}
