"use client";

import React from "react";
import type { FunctionComponent } from "react";
import ServerResponse from "@/types/productInterface";
import Filters from "@/components/layout/Filters";
import ProductItem from "@/components/products/productItem";

interface ListProductProps {
  data: ServerResponse[];
}

const ListProduct: FunctionComponent<ListProductProps> = ({ data }) => (
  <section className="py-12">
    <div className="container max-w-screen-xl mx-auto px-4">
      <div className="flex flex-col md:flex-row -mx-4">
        <Filters />
        <main className="md:w-2/3 lg:w-3/4 px-3">
          {data.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </main>
      </div>
    </div>
  </section>
);

export default ListProduct;
