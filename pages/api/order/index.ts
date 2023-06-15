import dbConnect from "@/backend/config/dbConnect";
import { singleCustomerOrder } from "@/backend/controllers/orderController";
import createRouter from "next-connect";
import wrap from "@/utility/wrapHandler";
import AuthGuard from "@/backend/middleware/AuthGuard";
import validateObjectId from "@/backend/middleware/validateObjectId";
import { MyRequest } from "@/types/NextApiResponse";

dbConnect();

const router = createRouter<
  MyRequest<{
    $data: Record<string, any>;
  }>
>();

router.get(
  validateObjectId(["id"], "query"),
  AuthGuard("admin"),
  wrap(singleCustomerOrder, "single-customer-order")
);

export default router;
