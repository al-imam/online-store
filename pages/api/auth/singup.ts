import createRouter from "next-connect";
import validateBody from "@/backend/middleware/validateBody";
import { singup } from "@/backend/controllers/authController";

const router = createRouter();

router.post(
  validateBody([
    ["name", (name) => typeof name === "string" && name.length < 30],
    ["email", (email) => typeof email === "string"],
    ["password", (password) => ["string", "number"].includes(typeof password)],
  ]),
  singup
);

export default router;
