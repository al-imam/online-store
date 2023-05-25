import dbConnect from "@/backend/config/dbConnect";
import {
  addProduct,
  getProducts,
} from "@/backend/controllers/productController";
import validateBody from "@/backend/middleware/validateBody";
import categories from "@/utility/categories";
import createRouter from "next-connect";

dbConnect();

const router = createRouter();

function validUndefined(value: any, callback: () => boolean) {
  if (value === undefined) return true;
  return callback();
}

router.post(
  validateBody([
    ["name", (name) => typeof name === "string" || "name must've string!"],
    [
      "description",
      (description) =>
        typeof description === "string" || "name must've string!",
    ],
    [
      "price",
      (price) =>
        (typeof price === "number" && price > 0) ||
        "price must've number and greater than zero!",
    ],
    [
      "stock",
      (stock) =>
        (typeof stock === "number" && stock >= 0) ||
        "stock must've number and not've minus number!",
    ],
    [
      "seller",
      (seller) => typeof seller === "string" || "seller must've string!",
    ],
    [
      "category",
      (category) =>
        categories.map((i) => i.toLowerCase()).includes(category) ||
        `${category} is not a valid category!`,
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
