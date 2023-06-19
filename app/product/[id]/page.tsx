import ProductDetails from "$components/products/ProductDetails";
import ProductInterface from "$types/productInterface";
import { Get } from "$utility/request";

interface ProductDetailsPageProps {
  params: { id: string };
}

export default async ({ params }: ProductDetailsPageProps) => {
  const { data } = await Get<ProductInterface>(`product/${params.id}`);

  return <ProductDetails product={data} />;
};
