import dbConnect from "$backend/config/dbConnect";
import { get, remove, update } from "$controllers/productController";
import AuthGuard from "$middleware/AuthGuard";
import validateObjectId from "$middleware/validateObjectId";
import { MyRequest } from "$types/NextApiResponse";
import { UserWithId } from "$types/UserInterface";
import wrap from "$utility/wrapHandler";
import { NextApiResponse } from "next";
import createRouter from "next-connect";
import { productValidate } from "..";

dbConnect();

const router = createRouter<
  MyRequest<{ $user: UserWithId; $data: Record<string, any> }>,
  NextApiResponse
>();

router.get(validateObjectId(["id"], "query"), wrap(get, "get-product"));

router.post(
  validateObjectId(["id"], "query"),
  productValidate,
  AuthGuard("admin"),
  wrap(update, "update-product")
);

router.delete(
  AuthGuard("admin"),
  validateObjectId(["id"], "query"),
  wrap(remove, "remove-product")
);

export default router;
