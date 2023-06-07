import dbConnect from "@/backend/config/dbConnect";
import { singin } from "@/backend/controllers/authController";
import validateBody from "@/backend/middleware/validateBody";
import emailRegex from "@/utility/regex";
import wrap from "@/utility/wrapHandler";
import createRouter from "next-connect";

dbConnect();

const router = createRouter();

router.post(
  validateBody([
    [
      "email",
      (email) =>
        (typeof email === "string" && email.match(emailRegex) !== null) ||
        "email is not valid",
    ],
    [
      "password",
      (password) =>
        (typeof password === "string" && password.length >= 6) ||
        "password must've string and 6 character or upper",
    ],
  ]),
  wrap(singin, "singin")
);

export default router;
