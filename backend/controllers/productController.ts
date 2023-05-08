import Product from "../models/product";
import { NextApiRequest, NextApiResponse } from "next";

export async function createProduct(req: NextApiRequest, res: NextApiResponse) {
  const newProduct = await Product.create(req.body);
  res.status(201).json(newProduct);
}

export async function getAllProduct(req: NextApiRequest, res: NextApiResponse) {
  const allProduct = await Product.find();
  res.status(200).json(allProduct);
}
