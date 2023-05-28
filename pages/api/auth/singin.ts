import dbConnect from "@/backend/config/dbConnect";
import { singin } from "@/backend/controllers/authController";
import createRouter from "next-connect";

dbConnect();

const router = createRouter();

router.post(singin);

export default router;
