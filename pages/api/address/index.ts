import createRouter from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { add, query } from "@/backend/controllers/addressController";
import validateBody from "@/backend/middleware/validateBody";
import AuthGuard from "@/backend/middleware/AuthGuard";
import wrap from "@/utility/wrapHandler";
import { validateCountry } from "./[addressId]";
import { isNumber, isString } from "nested-object-validate";
import { MyRequest } from "@/types/NextApiResponse";
import { NextApiResponse } from "next";

const router = createRouter<
  MyRequest<{ $data: Record<string, any> }>,
  NextApiResponse
>();

dbConnect();

router.post(
  validateBody([
    validateCountry(),
    isString("street"),
    isString("state"),
    isString("city"),
    isNumber("phone", true),
    isNumber("zip", true),
  ]),
  AuthGuard(),
  wrap(add, "add-address")
);

router.get(AuthGuard(), wrap(query, "query-addresses"));

export default router;
