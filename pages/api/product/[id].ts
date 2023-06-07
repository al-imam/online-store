import dbConnect from "@/backend/config/dbConnect";
import { get } from "@/backend/controllers/productController";
import validateObjectId from "@/backend/middleware/validateObjectId";
import wrap from "@/utility/wrapHandler";
import createRouter from "next-connect";

dbConnect();

const router = createRouter();

router.get(validateObjectId(["id"], "query"), wrap(get, "get-product"));

export default router;
