import { getProduct } from "@/backend/controllers/productController";
import createRouter from "next-connect";
import validateObjectId from "@/backend/middleware/validateObjectId";

const router = createRouter();

router.get(validateObjectId(["id"], "query"), getProduct);

export default router;
