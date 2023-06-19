import dbConnect from "$backend/config/dbConnect";
import { webhook } from "$controllers/orderController";
import wrap from "$utility/wrapHandler";
import createRouter from "next-connect";

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();

router.post(wrap(webhook, "stripe-webhook"));

export default router;
