import createRouter from "next-connect";
import { singup } from "@/backend/controllers/authController";

const router = createRouter();

router.post(singup);

export default router;
