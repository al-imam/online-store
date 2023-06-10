import dbConnect from "@/backend/config/dbConnect";
import { add, query } from "@/backend/controllers/productController";
import validateBody from "@/backend/middleware/validateBody";
import categories from "@/utility/categories";
import wrap from "@/utility/wrapHandler";
import { ignoreUndefined, isString } from "nested-object-validate";
import createRouter from "next-connect";

dbConnect();

const router = createRouter();

router.post(
  validateBody([
    isString("name"),
    isString("description"),
    isString("seller"),
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
      "category",
      (category) =>
        (typeof category === "string" &&
          categories
            .map((i) => i.toLowerCase())
            .includes(category.toLowerCase())) ||
        `${category} is not a valid category!`,
    ],
  ]),
  validateBody(
    [
      ignoreUndefined(
        "rating",
        (rating) =>
          (typeof rating === "number" && rating >= 0 && rating <= 5) ||
          "rating must've number and between 0 to 5!"
      ),
      ignoreUndefined(
        "images",
        (images) =>
          Array.isArray(images) || "images must've array of image url and id!"
      ),
      ignoreUndefined(
        "reviews",
        (reviews) =>
          Array.isArray(reviews) ||
          "reviews must've array of comment and rating!"
      ),
    ],
    { strict: false }
  ),
  wrap(add, "add-product")
);

router.get(wrap(query, "query-products"));

export default router;
