import dbConnect from "@/backend/config/dbConnect";
import createRouter from "next-connect";
import { update } from "@/backend/controllers/authController";
import AuthGuard from "@/backend/middleware/AuthGuard";
import validateBody from "@/backend/middleware/validateBody";
import wrap from "@/utility/wrapHandler";
import { UserWithId } from "@/types/UserInterface";

dbConnect();

const router = createRouter();

router.put(
  validateBody([
    [
      "current",
      (current) =>
        (typeof current === "string" && current.length > 5) ||
        "you dump no password is shorter then 6 character",
    ],
    [
      "password",
      (password) =>
        (typeof password === "string" && password.length > 5) ||
        "password must've 6 character long!",
    ],
  ]),
  AuthGuard(),
  wrap<{ $data: { current: string; password: string }; $user: UserWithId }>(
    update,
    "update-password"
  )
);

export default router;
