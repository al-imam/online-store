import dbConnect from "$backend/config/dbConnect";
import { query } from "$controllers/orderController";
import AuthGuard from "$middleware/AuthGuard";
import wrap from "$utility/wrapHandler";
import createRouter from "next-connect";

dbConnect();

const router = createRouter();

router.get(AuthGuard("admin"), wrap(query, "customer-orders"));

export default router;
