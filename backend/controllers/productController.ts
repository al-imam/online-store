import Product from "@/backend/models/product";
import filter from "@/backend/util/filter";
import { NextApiRequest, NextApiResponse } from "next";
import parseNumber from "../util/parseNumber";
import { revalidatePath } from "next/cache";

function calculateSkipNumber(num: string, fallback: number = 0, single = 2) {
  const n = parseInt(num as string);
  if (isNaN(n)) return fallback;

  return n === 0 ? 0 : n * single - single;
}

export async function add(req: NextApiRequest, res: NextApiResponse) {
  const newDocs = await Product.create(
    Object.assign(req.body.VALID_REQ, { user: req.body.$USER._id })
  );
  res.status(201).json(newDocs);
}

export async function query(req: NextApiRequest, res: NextApiResponse) {
  const single = parseNumber(req.query["docs-per-page"] as string, 2);

  const docs = await Product.find(filter(req.query), undefined, {
    skip: calculateSkipNumber(req.query.page as string),
    limit: single,
  });

  const count = await Product.find(filter(req.query)).countDocuments();

  res.status(200).json({ products: docs, count, single });
}

export async function get(req: NextApiRequest, res: NextApiResponse) {
  const doc = await Product.findById(req.query.id);

  if (doc === null) {
    res.status(400).json({
      code: "get-product-by-id",
      error: "No product found by id",
    });
  }

  res.status(200).json(doc);
}

export async function remove(req: NextApiRequest, res: NextApiResponse) {
  const doc = await Product.findById(req.query.id);

  if (!doc) {
    return res.status(404).json({
      code: "remove-product",
      message: "Product not found!",
    });
  }

  await doc.deleteOne();

  res.status(200).json({ success: true });
}
