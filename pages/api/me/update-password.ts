import dbConnect from "@/backend/config/dbConnect";
import createRouter from "next-connect";
import { updatePassword } from "@/backend/controllers/authController";
import AuthGuard from "@/backend/middleware/AuthGuard";
import validateBody from "@/backend/middleware/validateBody";

dbConnect();

const router = createRouter();

router.post(
  validateBody([
    [
      "currentPassword",
      (cp) =>
        (typeof cp === "string" && cp.length > 5) ||
        "you dump no password is shorter then 6 character",
    ],
    [
      "password",
      (password) =>
        (typeof password === "string" && password.length > 5) ||
        "password must've 6 character long!",
    ],
  ]),
  AuthGuard,
  updatePassword
);

export default router;
