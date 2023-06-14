import Pagination from "@/components/layout/Pagination";
import ProductInterface from "@/types/productInterface";
import ProductRow from "@/components/admin/ProductRow";
import { Fragment } from "react";

interface ProductTableProps {
  data: { products: ProductInterface[]; count: number; single: number };
}

export default function ({ data }: ProductTableProps) {
  return (
    <Fragment>
      <h1 className="text-3xl  m-4 font-bold">{data.count} Products</h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.products.map((product) => (
            <ProductRow product={product} key={product._id} />
          ))}
        </tbody>
      </table>
      <div className="mb-6">
        <Pagination
          single={data.single}
          total={data.count}
          path="me/admin/products"
        />
      </div>
    </Fragment>
  );
}
