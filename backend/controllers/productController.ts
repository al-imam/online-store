import Product from "@/backend/models/product";
import filter from "@/backend/util/filter";
import { NextApiRequest, NextApiResponse } from "next";

const single = 2;

function calculateSkipNumber(num: string, fallback: number = 0) {
  const n = parseInt(num as string);
  if (isNaN(n)) return fallback;

  return n === 0 ? 0 : n * single - single;
}

export async function add(req: NextApiRequest, res: NextApiResponse) {
  const newDocs = await Product.create(req.body.VALID_REQ);
  res.status(201).json(newDocs);
}

export async function query(req: NextApiRequest, res: NextApiResponse) {
  const docs = await Product.find(filter(req.query), undefined, {
    skip: calculateSkipNumber(req.query.page as string),
    limit: single,
  });

  const total = await Product.find(filter(req.query)).countDocuments();

  res.status(200).json({ products: docs, total, single });
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
