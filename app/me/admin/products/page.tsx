import { Get } from "@/utility/request";
import ProductInterface from "@/types/productInterface";
import ProductTable from "@/components/admin/ProductTable";

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
  const { data } = await Get<DATA>(`product/?docs-per-page=5&page=${page}`);

  return <ProductTable data={data} />;
}
