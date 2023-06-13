import ProductForm from "@/components/admin/ProductForm";
import ProductInterface from "@/types/productInterface";
import COOKIES from "@/utility/COOKIES";
import { Get } from "@/utility/request";
import { cookies } from "next/headers";

export default async function ({ params }: { params: { id: string } }) {
  const jwt = cookies().get(COOKIES)?.value;

  const { data } = await Get<ProductInterface>(`product/${params.id}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return (
    <ProductForm
      init={{
        category: data.category.toLowerCase(),
        description: data.description,
        name: data.name,
        price: data.price.toString(),
        seller: data.seller,
        stock: data.stock.toString(),
      }}
      is="Update"
      title="Update product"
      url={`product/${params.id}`}
    />
  );
}
