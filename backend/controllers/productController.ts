import Product from "@/backend/models/product";
import filter from "@/backend/util/filter";
import { NextApiRequest, NextApiResponse } from "next";
import parseNumber from "../util/parseNumber";
import { MyRequest } from "@/types/NextApiResponse";
import { UserWithId } from "@/types/UserInterface";

function calculateSkipNumber(num: string, fallback: number = 0, single = 2) {
  const n = parseInt(num as string);
  if (isNaN(n)) return fallback;

  return n === 0 ? 0 : n * single - single;
}

export async function add(
  req: MyRequest<{ $user: UserWithId; $data: Record<string, any> }>,
  res: NextApiResponse
) {
  const doc = await Product.create(
    Object.assign(req.$data, { user: req.$user._id })
  );
  res.status(201).json(doc);
}

export async function update(
  req: MyRequest<{ $user: UserWithId; $data: Record<string, any> }>,
  res: NextApiResponse
) {
  const doc = await Product.findByIdAndUpdate(
    req.query.id,
    { $set: req.$data },
    { new: true }
  );

  if (!doc) {
    return res.status(404).json({
      code: "update-product",
      message: "product not found!",
    });
  }

  res.status(200).json(doc);
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

export async function products(
  req: MyRequest<{ $user: UserWithId }>,
  res: NextApiResponse
) {
  const single = parseNumber(req.query["docs-per-page"] as string, 2);

  const docs = await Product.find({ user: req.$user._id }, undefined, {
    skip: calculateSkipNumber(req.query.page as string),
    limit: single,
  });

  const count = await Product.find({ user: req.$user._id }).countDocuments();

  res.status(200).json({ products: docs, count, single });
}
