import dbConnect from "@/backend/config/dbConnect";
import { get, remove } from "@/backend/controllers/productController";
import AuthGuard from "@/backend/middleware/AuthGuard";
import validateObjectId from "@/backend/middleware/validateObjectId";
import { MyRequest } from "@/types/NextApiResponse";
import { UserWithId } from "@/types/UserInterface";
import wrap from "@/utility/wrapHandler";
import { NextApiResponse } from "next";
import createRouter from "next-connect";

dbConnect();

const router = createRouter<
  MyRequest<{ $user: UserWithId; $data: Record<string, any> }>,
  NextApiResponse
>();

router.get(validateObjectId(["id"], "query"), wrap(get, "get-product"));

router.delete(
  AuthGuard("admin"),
  validateObjectId(["id"], "query"),
  wrap(remove, "remove-product")
);

export default router;
