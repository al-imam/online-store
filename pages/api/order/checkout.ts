import dbConnect from "@/backend/config/dbConnect";
import { checkout } from "@/backend/controllers/orderController";
import createRouter from "next-connect";

dbConnect();

const router = createRouter();

router.post(checkout);

export default router;
