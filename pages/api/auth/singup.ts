import dbConnect from "@/backend/config/dbConnect";
import { singup } from "@/backend/controllers/authController";
import validateBody from "@/backend/middleware/validateBody";
import emailRegex, { urlRegex } from "@/utility/regex";
import createRouter from "next-connect";
import wrap from "@/utility/wrapHandler";
import { ignoreUndefined } from "nested-object-validate";

dbConnect();

const router = createRouter();

router.post(
  validateBody([
    ["name", (name) => typeof name === "string" && name.length < 30],
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
  validateBody(
    [
      ignoreUndefined(
        "role",
        (role) => ["user", "admin"].includes(role) || `${role} is not valid`
      ),
      ignoreUndefined(
        "avatar",
        (avatar) => avatar.match(urlRegex) !== null || "url is not valid"
      ),
    ],
    { strict: false }
  ),
  wrap(singup, "singup")
);

export default router;
