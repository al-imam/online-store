import createRouter from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { add, query } from "@/backend/controllers/addressController";
import validateBody from "@/backend/middleware/validateBody";
import { countries } from "countries-list";
import AuthGuard from "@/backend/middleware/AuthGuard";
import wrap from "@/utility/wrapHandler";

const router = createRouter();

const countrys = Object.values(countries);

dbConnect();

function SHOC(name: string): [string, (value: any) => string | boolean] {
  return [
    name,
    (value: any) => typeof value === "string" || `${name} must've string`,
  ];
}

function NHOC(name: string): [string, (value: any) => string | boolean] {
  return [
    name,
    (value: any) =>
      ((typeof value === "number" || typeof value === "string") &&
        !isNaN(parseInt(value as string))) ||
      `${name} must've number`,
  ];
}

router.post(
  validateBody([
    [
      "country",
      (country) =>
        countrys.find((c) => c.name.toLowerCase() === country?.toLowerCase())
          ? true
          : `${country} is not valid country`,
    ],
    SHOC("street"),
    SHOC("state"),
    SHOC("city"),
    NHOC("phone"),
    NHOC("zip"),
  ]),
  AuthGuard,
  wrap(add, "add-address")
);

router.get(AuthGuard, wrap(query, "query-addresses"));

export default router;
