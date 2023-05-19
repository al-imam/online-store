import Product from "../models/product";
import { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import filter from "../util/filter";

function parseNumber(num: string, fallback: number) {
  const n = parseInt(num as string);
  if (!isNaN(n)) return n;
  return fallback;
}

export async function createProduct(req: NextApiRequest, res: NextApiResponse) {
  const newProduct = await Product.create(req.body);
  res.status(201).json(newProduct);
}

export async function getAllProduct(req: NextApiRequest, res: NextApiResponse) {
  const allProduct = await Product.find(filter(req.query), undefined, {
    skip: parseNumber(req.query.skip as string, 0),
    limit: 3,
  });
  res.status(200).json(allProduct);
}

export async function getProductById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidObjectId(req.query.id)) {
    res.status(400).json({
      id: "product/:id",
      error: ":id is not valid ObjectId",
    });
  }

  const product = await Product.findById(req.query.id);

  res.status(200).json(product);
}
