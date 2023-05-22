import { getProduct } from "@/backend/controllers/productController";
import createRouter from "next-connect";

const router = createRouter();

router.get(getProduct);

export default router;
