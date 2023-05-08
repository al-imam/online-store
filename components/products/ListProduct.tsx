import type { FunctionComponent } from "react";
import React from "react";

interface Image {
  product_id: string;
  url: string;
}

interface Review {
  rating: string;
  comment: string;
  created: Date;
}

interface ServerResponse {
  _id: string;
  name: string;
  description: string;
  price: number;
  seller: string;
  stock: number;
  rating: number;
  category: string;
  images: Image[];
  reviews: Review[];
  created: string;
  updated: string;
  __v: number;
}

interface ListProductProps {
  data: ServerResponse[];
}

const ListProduct: FunctionComponent<ListProductProps> = ({ data }) => {
  return <h1>{JSON.stringify(data)}</h1>;
};

export default ListProduct;
