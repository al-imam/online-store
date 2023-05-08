import Product from "../models/product";
import { NextApiRequest, NextApiResponse } from "next";

export async function create(req: NextApiRequest, res: NextApiResponse) {
  const newProduct = await Product.create(req.body);
  res.status(201).json(newProduct);
}
