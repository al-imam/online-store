import dbConnect from "@/backend/config/dbConnect";
import { checkout } from "@/backend/controllers/orderController";
import AuthGuard from "@/backend/middleware/AuthGuard";
import validateBody from "@/backend/middleware/validateBody";
import { isValidObjectId } from "mongoose";
import wrap from "@/utility/wrapHandler";
import createRouter from "next-connect";
import { isString } from "nested-object-validate";
import { UserWithId } from "@/types/UserInterface";
import { urlRegex } from "@/utility/regex";

dbConnect();

const router = createRouter();

router.post(
  validateBody([
    [
      "items",
      (items, validate) => {
        if (!Array.isArray(items)) return "required array of items";

        if (
          items.every((item) =>
            validate(item, [
              [
                "quantity",
                (quantity) => typeof quantity === "number" && quantity > 0,
              ],
              ["price", (price) => typeof price === "number" && price > 0],
              isString("name"),
              isString("id"),
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
    ],
    [
      "addressId",
      (id) =>
        (typeof id === "string" && isValidObjectId(id)) ||
        "addressId is not valid object id",
    ],
  ]),
  AuthGuard(),
  wrap<{
    $user: UserWithId;
    $data: {
      items: {
        price: number;
        quantity: number;
        imageURL: string;
        name: string;
        id: string;
      }[];
      addressId: string;
    };
  }>(checkout, "checkout")
);

export default router;
