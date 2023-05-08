import dbConnect from "@/backend/config/dbConnect";
import {
  createProduct,
  getAllProduct,
} from "@/backend/controllers/productController";
import createRouter from "next-connect";

dbConnect(process.env.MONGO_URI as string);

const router = createRouter();

router.post(createProduct);
router.get(getAllProduct);

export default router;
