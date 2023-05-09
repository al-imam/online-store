import ServerResponse from "@/types/productInterface";
import React from "react";
import type { FunctionComponent } from "react";
import Link from "next/link";
import StarRating from "@/components/utility/StarRating";
import Image from "next/image";

interface ProductItemProps {
  product: ServerResponse;
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => (
  <article className="backdrop:border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5">
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 flex p-3">
        <div
          style={{
            width: "80%",
            height: "70%",
            position: "relative",
          }}
        >
          <Image
            src={product.images[0]?.url}
            alt="product name"
            height="240"
            width="240"
          />
        </div>
      </div>
      <div className="md:w-2/4">
        <div className="p-4">
          <Link href={`/`} className="hover:text-blue-600">
            {product.name}
          </Link>
          <div className="flex flex-wrap items-center space-x-2 mb-2">
            <div className="ratings">
              <div className="my-1">
                <StarRating
                  rating={product.rating}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  starDimension="18px"
                  starSpacing="1px"
                  name="rating"
                />
              </div>
            </div>
            <b className="text-gray-300">•</b>
            <span className="ml-1 text-yellow-500">{product.rating}</span>
          </div>
          <p className="text-gray-500 mb-2">
            {product.description.slice(0, 300)}...
          </p>
        </div>
      </div>
      <div className="md:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200">
        <div className="p-5">
          <span className="text-xl font-semibold text-black">
            {product.price}
          </span>
          <p className="text-green-500">Free Shipping</p>
          <div className="my-3">
            <a className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer">
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  </article>
);

export default ProductItem;
