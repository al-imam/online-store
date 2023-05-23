import dbConnect from "@/backend/config/dbConnect";
import { singup } from "@/backend/controllers/authController";
import validateBody from "@/backend/middleware/validateBody";
import emailRegex from "@/utility/regex";
import createRouter from "next-connect";

dbConnect();

function validUndefined(value: any, callback: () => boolean) {
  if (value === undefined) return true;
  return callback();
}

const router = createRouter();

router.post(
  validateBody([
    ["name", (name) => typeof name === "string" && name.length < 30],
    [
      "email",
      (email) => typeof email === "string" && email.match(emailRegex) !== null,
    ],
    [
      "password",
      (password) => typeof password === "string" && password.length >= 6,
    ],
  ]),
  validateBody(
    [
      [
        "role",
        (role) => validUndefined(role, () => ["user", "admin"].includes(role)),
      ],
      [
        "avatar",
        (avatar) => validUndefined(avatar, () => typeof avatar === "string"),
      ],
    ],
    {
      strict: false,
    }
  ),
  singup
);

export default router;
