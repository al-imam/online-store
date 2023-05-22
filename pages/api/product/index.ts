import dbConnect from "@/backend/config/dbConnect";
import {
  getProducts,
  addProduct,
} from "@/backend/controllers/productController";
import validateBody from "@/backend/middleware/validateBody";
import createRouter from "next-connect";
import categories from "@/utility/categories";

dbConnect(process.env.MONGO_URI as string);

const router = createRouter();

function validUndefined(value: any, callback: () => boolean) {
  if (value === undefined) return true;
  return callback();
}

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
  validateBody(
    [
      [
        "rating",
        (rating) => validUndefined(rating, () => typeof rating === "number"),
      ],
      [
        "images",
        (images) => validUndefined(images, () => Array.isArray(images)),
      ],
      [
        "reviews",
        (reviews) => validUndefined(reviews, () => Array.isArray(reviews)),
      ],
    ],
    { strict: false }
  ),
  addProduct
);

router.get(getProducts);

export default router;
