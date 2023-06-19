import dbConnect from "$backend/config/dbConnect";
import { add, query } from "$controllers/productController";
import AuthGuard from "$middleware/AuthGuard";
import validateBody from "$middleware/validateBody";
import { MyRequest } from "$types/NextApiResponse";
import { UserWithId } from "$types/UserInterface";
import categories from "$utility/categories";
import wrap from "$utility/wrapHandler";
import { isString } from "nested-object-validate";
import { NextApiResponse } from "next";
import createRouter from "next-connect";

dbConnect();

const router = createRouter<
  MyRequest<{ $user: UserWithId; $data: Record<string, any> }>,
  NextApiResponse
>();

export const productValidate = validateBody([
  isString("name"),
  isString("description"),
  isString("seller"),
  [
    "price",
    (price) =>
      (typeof price === "number" && price > 0) ||
      "price must've number and greater than zero!",
  ],
  [
    "stock",
    (stock) =>
      (typeof stock === "number" && stock >= 0) ||
      "stock must've number and not've minus number!",
  ],
  [
    "category",
    (category) =>
      (typeof category === "string" &&
        categories
          .map((i) => i.toLowerCase())
          .includes(category.toLowerCase())) ||
      `${category} is not a valid category!`,
  ],
]);

router.post(productValidate, AuthGuard("admin"), wrap(add, "add-product"));

router.get(wrap(query, "query-products"));

export default router;
