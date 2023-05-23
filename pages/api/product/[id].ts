import dbConnect from "@/backend/config/dbConnect";
import { getProduct } from "@/backend/controllers/productController";
import validateObjectId from "@/backend/middleware/validateObjectId";
import createRouter from "next-connect";

dbConnect();

const router = createRouter();

router.get(validateObjectId(["id"], "query"), getProduct);

export default router;
