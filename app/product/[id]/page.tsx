import ProductDetails from "@/components/products/ProductDetails";
import { Get } from "@/utility/request";
import ProductInterface from "@/types/productInterface";

interface ProductDetailsPageProps {
  params: { id: string };
}

export default async ({ params }: ProductDetailsPageProps) => {
  const { data } = await Get<ProductInterface>(`product/${params.id}`);

  return <ProductDetails product={data} />;
};
