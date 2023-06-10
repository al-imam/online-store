import dbConnect from "@/backend/config/dbConnect";
import { get, remove, update } from "@/backend/controllers/addressController";
import AuthGuard from "@/backend/middleware/AuthGuard";
import validateBody from "@/backend/middleware/validateBody";
import validateObjectId from "@/backend/middleware/validateObjectId";
import wrap from "@/utility/wrapHandler";
import { countries } from "countries-list";
import { ValidatorType, isNumber, isString } from "nested-object-validate";
import createRouter from "next-connect";

const router = createRouter();

const countrys = Object.values(countries);

export function validateCountry() {
  return [
    "country",
    (country) =>
      countrys.find((c) => c.name.toLowerCase() === country?.toLowerCase())
        ? true
        : `${country} is not valid country`,
  ] as ValidatorType;
}

dbConnect();

router.put(
  validateBody([
    validateCountry(),
    isString("street"),
    isString("state"),
    isString("city"),
    isNumber("phone", true),
    isNumber("zip", true),
  ]),
  validateObjectId(["addressId"], "query"),
  AuthGuard(),
  wrap(update, "update-address")
);

router.get(
  validateObjectId(["addressId"], "query"),
  AuthGuard(),
  wrap(get, "get-addresses")
);

router.delete(
  validateObjectId(["addressId"], "query"),
  AuthGuard(),
  wrap(remove, "remove-address")
);

export default router;
