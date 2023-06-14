import dbConnect from "@/backend/config/dbConnect";
import { query } from "@/backend/controllers/orderController";
import createRouter from "next-connect";
import wrap from "@/utility/wrapHandler";
import AuthGuard from "@/backend/middleware/AuthGuard";

dbConnect();

const router = createRouter();

router.get(AuthGuard("admin"), wrap(query, "customer-orders"));

export default router;
