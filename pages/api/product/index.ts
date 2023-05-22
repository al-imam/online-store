import dbConnect from "@/backend/config/dbConnect";
import {
  createProduct,
  getAllProduct,
} from "@/backend/controllers/productController";
import validateBody from "@/backend/middleware/validateBody";
import createRouter from "next-connect";
import categories from "@/utility/categories";

dbConnect(process.env.MONGO_URI as string);

const router = createRouter();

router.post(
  validateBody([
    ["name", (name) => typeof name === "string"],
    ["description", (description) => typeof description === "string"],
    ["price", (price) => typeof price === "number"],
    ["stock", (stock) => typeof stock === "number"],
    ["seller", (seller) => typeof seller === "string"],
    [
      "category",
      (category) => categories.map((i) => i.toLowerCase()).includes(category),
    ],
  ]),
  createProduct
);
router.get(getAllProduct);

export default router;
