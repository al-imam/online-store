import { getProduct } from "@/backend/controllers/productController";
import validateObjectId from "@/backend/middleware/validateObjectId";
import createRouter from "next-connect";

const router = createRouter();

router.get(validateObjectId(["id"], "query"), getProduct);

export default router;
