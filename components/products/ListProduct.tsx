import type { FunctionComponent } from "react";
import React from "react";

interface ListProductProps {
  data: any;
}

const ListProduct: FunctionComponent<ListProductProps> = ({ data }) => {
  return <h1>{JSON.stringify(data)}</h1>;
};

export default ListProduct;
