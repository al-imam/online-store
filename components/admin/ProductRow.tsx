"use client";

import Link from "next/link";
import ProductInterface from "@/types/productInterface";
import useProduct from "@/context/ProductProvider";
import { useRouter } from "next/navigation";
import uuid from "@/utility/uuid";

interface ProductRowProps {
  product: Pick<ProductInterface, "name" | "price" | "stock" | "_id">;
}

export default function ({ product }: ProductRowProps) {
  const { remove } = useProduct();
  const router = useRouter();

  return (
    <tr className="bg-white">
      <td className="px-6 py-2">{product.name}</td>
      <td className="px-6 py-2">{product.stock}</td>
      <td className="px-6 py-2">${product.price}</td>
      <td className="px-6 py-2">
        <div>
          <Link
            href={`/me/admin/products/${product._id}/upload-images`}
            className="px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
          >
            <i className="fa fa-image" aria-hidden="true"></i>
          </Link>

          <Link
            href={`/me/admin/products/${product._id}/upload-product`}
            className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
          >
            <i className="fa fa-edit" aria-hidden="true"></i>
          </Link>
          <button
            onClick={() =>
              remove({
                id: product._id,
                onSuccess() {
                  router.replace(`/me/admin/products?id=${uuid()}`);
                },
              })
            }
            className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}
