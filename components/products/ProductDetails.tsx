import React from "react";
import StarRating from "@/components/utility/StarRating";
import ServerResponse from "@/types/productInterface";
import ImageGallery from "@/components/utility/ImageGallery";
import BreadCrumbs from "@/components/layout/BreadCrumbs";
import AddToCartButton from "../utility/AddToCartButton";

interface ProductDetailsProps {
  product: ServerResponse;
}

const ProductDetails = ({ product }: ProductDetailsProps) => (
  <>
    <BreadCrumbs
      list={[
        { name: "Home", url: "/" },
        {
          name:
            product.name.length >= 100
              ? `${product.name.substring(0, 100)}...`
              : product.name,
          url: `/product/${product._id}`,
        },
      ]}
    />
    <section className="bg-white py-10">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
          <ImageGallery images={product.images} />
          <main>
            <h2 className="font-semibold text-2xl mb-4">{product.name}</h2>

            <div className="flex flex-wrap items-center space-x-2 mb-2">
              <div className="ratings">
                <StarRating
                  rating={product.rating}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                  name="rating"
                />
              </div>
              <span className="text-yellow-500">{product.rating}</span>

              <svg
                width="6px"
                height="6px"
                viewBox="0 0 6 6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
              </svg>

              <span className="text-green-500">Verified</span>
            </div>

            <p className="mb-4 font-semibold text-xl">${product.price}</p>

            <p className="mb-4 text-gray-500">{product.description}</p>

            <div className="flex flex-wrap gap-2 mb-5">
              <AddToCartButton />
            </div>

            <ul className="mb-5">
              <li className="mb-1">
                <b className="font-medium w-36 inline-block">Stock</b>
                {product.stock > 0 ? (
                  <span className="text-green-500">In Stock</span>
                ) : (
                  <span className="text-red-500">Out Of Stock</span>
                )}
              </li>
              <li className="mb-1">
                <b className="font-medium w-36 inline-block">Category:</b>
                <span className="text-gray-500">{product.category}</span>
              </li>
              <li className="mb-1">
                <b className="font-medium w-36 inline-block">Seller / Brand:</b>
                <span className="text-gray-500">{product.seller}</span>
              </li>
            </ul>
          </main>
        </div>

        <hr />

        <div className="font-semibold">
          <h1 className="text-gray-500 review-title mb-6 mt-10 text-2xl">
            Other Customers Reviews
          </h1>
        </div>
      </div>
    </section>
  </>
);

export default ProductDetails;
