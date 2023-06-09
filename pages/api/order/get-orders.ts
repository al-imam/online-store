import dbConnect from "@/backend/config/dbConnect";
import { get } from "@/backend/controllers/orderController";
import createRouter from "next-connect";
import wrap from "@/utility/wrapHandler";
import AuthGuard from "@/backend/middleware/AuthGuard";

dbConnect();

const router = createRouter();

router.get(AuthGuard(), wrap(get, "get-orders"));

export default router;
