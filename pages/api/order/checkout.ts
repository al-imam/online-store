import dbConnect from "@/backend/config/dbConnect";
import { checkout } from "@/backend/controllers/orderController";
import validateBody from "@/backend/middleware/validateBody";
import Prettify from "@/types/Prettify";
import CartItemInterface from "@/types/cartItemInterface";
import { urlRegex } from "@/utility/regex";

import createRouter from "next-connect";

type C = Prettify<CartItemInterface>;

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
              [
                "imageURL",
                (imageURL) =>
                  (typeof imageURL === "string" && urlRegex.test(imageURL)) ||
                  imageURL === null,
              ],
            ])
          )
        ) {
          return true;
        }

        return "items array doesn't contain valid item";
      },
    },
  ]),
  checkout
);

export default router;
