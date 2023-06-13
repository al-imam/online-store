import dbConnect from "@/backend/config/dbConnect";
import { products } from "@/backend/controllers/productController";
import AuthGuard from "@/backend/middleware/AuthGuard";
import wrap from "@/utility/wrapHandler";
import createRouter from "next-connect";

dbConnect();

const router = createRouter();

router.get(AuthGuard("admin"), wrap(products, "my-products"));

export default router;
