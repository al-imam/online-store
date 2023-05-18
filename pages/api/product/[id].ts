import dbConnect from "@/backend/config/dbConnect";
import { getProductById } from "@/backend/controllers/productController";
import createRouter from "next-connect";

const router = createRouter();

router.get(getProductById);

export default router;
