import dbConnect from "@/backend/config/dbConnect";
import { webhook } from "@/backend/controllers/orderController";
import createRouter from "next-connect";
import wrap from "@/utility/wrapHandler";

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();

router.post(wrap(webhook, "stripe-webhook"));

export default router;
