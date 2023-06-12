import dbConnect from "@/backend/config/dbConnect";
import { get, remove } from "@/backend/controllers/productController";
import AuthGuard from "@/backend/middleware/AuthGuard";
import validateObjectId from "@/backend/middleware/validateObjectId";
import wrap from "@/utility/wrapHandler";
import createRouter from "next-connect";

dbConnect();

const router = createRouter();

router.get(validateObjectId(["id"], "query"), wrap(get, "get-product"));

router.delete(AuthGuard("admin"), validateObjectId(["id"], "query"), remove);

export default router;
