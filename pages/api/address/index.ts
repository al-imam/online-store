import dbConnect from "$backend/config/dbConnect";
import { add, query } from "$controllers/addressController";
import AuthGuard from "$middleware/AuthGuard";
import validateBody from "$middleware/validateBody";
import { MyRequest } from "$types/NextApiResponse";
import wrap from "$utility/wrapHandler";
import { isNumber, isString } from "nested-object-validate";
import { NextApiResponse } from "next";
import createRouter from "next-connect";
import { validateCountry } from "./[addressId]";

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
