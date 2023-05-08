import dbConnect from "@/backend/config/dbConnect";
import { create } from "@/backend/controllers/productController";
import createRouter from "next-connect";

dbConnect(process.env.MONGO_URI as string);

const router = createRouter();

router.post(create);

export default router;
