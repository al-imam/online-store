import dbConnect from "@/backend/config/dbConnect";
import {
  createProduct,
  getAllProduct,
} from "@/backend/controllers/productController";
import validateBody from "@/backend/middleware/validateBody";
import createRouter from "next-connect";

dbConnect(process.env.MONGO_URI as string);

const router = createRouter();

router.post(
  validateBody(["name", "description", "price", "stock", "seller", "category"]),
  createProduct
);
router.get(getAllProduct);

export default router;
