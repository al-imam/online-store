import React from "react";
import type { FunctionComponent } from "react";
import ProductInterface from "@/types/productInterface";
import Filters from "@/components/layout/Filters";
import ProductItem from "@/components/products/productItem";
import Pagination from "@/components/layout/Pagination";

interface ListProductProps {
  data: { products: ProductInterface[]; count: number; single: number };
}

const ListProduct: FunctionComponent<ListProductProps> = ({ data }) => (
  <section className="py-12">
    <div className="container max-w-screen-xl mx-auto px-4">
      <div className="flex flex-col md:flex-row -mx-4">
        <Filters />
        <main className="md:w-2/3 lg:w-3/4 px-3">
          {data.products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}

          <Pagination total={data.count} single={data.single} />
        </main>
      </div>
    </div>
  </section>
);

export default ListProduct;
