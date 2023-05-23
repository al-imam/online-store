import createRouter from "next-connect";
import validateBody from "@/backend/middleware/validateBody";
import { singup } from "@/backend/controllers/authController";
import dbConnect from "@/backend/config/dbConnect";
import emailRegex from "@/utility/regex";

dbConnect();

const router = createRouter();

router.post(
  validateBody([
    ["name", (name) => typeof name === "string" && name.length < 30],
    [
      "email",
      (email) => typeof email === "string" && email.match(emailRegex) !== null,
    ],
    ["password", (password) => ["string", "number"].includes(typeof password)],
  ]),
  singup
);

export default router;
