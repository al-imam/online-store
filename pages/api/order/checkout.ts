import dbConnect from "@/backend/config/dbConnect";
import { checkout } from "@/backend/controllers/orderController";
import AuthGuard from "@/backend/middleware/AuthGuard";
import validateBody from "@/backend/middleware/validateBody";
import { urlRegex } from "@/utility/regex";
import { isValidObjectId } from "mongoose";
import wrap from "@/utility/wrapHandler";

import createRouter from "next-connect";

dbConnect();

const router = createRouter();

router.post(
  validateBody([
    {
      property: "items",
      validate: (items, validate) => {
        if (!Array.isArray(items)) return "required array of items";

        if (
          items.every((item) =>
            validate(item, [
              [
                "quantity",
                (quantity) => typeof quantity === "number" && quantity > 0,
              ],
              ["price", (price) => typeof price === "number" && price > 0],
              ["name", (name) => typeof name === "string"],
              ["id", (id) => typeof id === "string"],
              [
                "imageURL",
                (imageURL) =>
                  typeof imageURL === "string" && urlRegex.test(imageURL),
              ],
            ])
          )
        ) {
          return true;
        }

        return "items array doesn't contain valid item";
      },
    },
    {
      property: "addressId",
      validate: (id) =>
        (typeof id === "string" && isValidObjectId(id)) ||
        "addressId is not valid object id",
    },
  ]),
  AuthGuard,
  wrap(checkout, "checkout")
);

export default router;
