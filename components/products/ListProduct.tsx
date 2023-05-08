import type { FunctionComponent } from "react";
import React from "react";
import ServerResponse from "@/types/productInterface";

interface ListProductProps {
  data: ServerResponse[];
}

const ListProduct: FunctionComponent<ListProductProps> = ({ data }) => {
  return <h1>{JSON.stringify(data)}</h1>;
};

export default ListProduct;
