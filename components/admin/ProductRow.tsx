import Link from "next/link";
import ServerResponse from "@/types/productInterface";

interface ProductRowProps {
  product: Pick<ServerResponse, "name" | "price" | "stock">;
}

export default function ({ product }: ProductRowProps) {
  return (
    <tr className="bg-white">
      <td className="px-6 py-2">{product.name}</td>
      <td className="px-6 py-2">{product.stock}</td>
      <td className="px-6 py-2">${product.price}</td>
      <td className="px-6 py-2">
        <div>
          <Link
            href={`/admin/products/upload_images`}
            className="px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
          >
            <i className="fa fa-image" aria-hidden="true"></i>
          </Link>

          <Link
            href={`/admin/products`}
            className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
          >
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </Link>
          <a className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
            <i className="fa fa-trash" aria-hidden="true"></i>
          </a>
        </div>
      </td>
    </tr>
  );
}
