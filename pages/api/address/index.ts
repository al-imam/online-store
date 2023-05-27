import createRouter from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { addAddress } from "@/backend/controllers/addressController";
import validateBody from "@/backend/middleware/validateBody";
import { countries } from "countries-list";

const router = createRouter();

const countrys = Object.values(countries);

dbConnect();

router.post(
  validateBody([
    [
      "country",
      (country) =>
        countrys.find((c) => c.name.toLowerCase() === country?.toLowerCase())
          ? true
          : `${country} is not valid country`,
    ],
  ]),
  addAddress
);

export default router;
