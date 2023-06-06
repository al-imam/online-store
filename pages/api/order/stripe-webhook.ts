import dbConnect from "@/backend/config/dbConnect";
import { webhook } from "@/backend/controllers/orderController";
import createRouter from "next-connect";

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();

router.post(webhook);

export default router;
