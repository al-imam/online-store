import dbConnect from "$backend/config/dbConnect";
import { get } from "$controllers/orderController";
import AuthGuard from "$middleware/AuthGuard";
import wrap from "$utility/wrapHandler";
import createRouter from "next-connect";

dbConnect();

const router = createRouter();

router.get(AuthGuard(), wrap(get, "get-orders"));

export default router;
