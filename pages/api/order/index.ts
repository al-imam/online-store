import dbConnect from "@/backend/config/dbConnect";
import {
  deleteOrder,
  singleCustomerOrder,
  updateOrderStatus,
} from "@/backend/controllers/orderController";
import createRouter from "next-connect";
import wrap from "@/utility/wrapHandler";
import AuthGuard from "@/backend/middleware/AuthGuard";
import validateObjectId from "@/backend/middleware/validateObjectId";
import { MyRequest } from "@/types/NextApiResponse";
import validateBody from "@/backend/middleware/validateBody";
import { isString } from "nested-object-validate";

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

router.put(
  validateObjectId(["id"], "query"),
  validateBody([isString("status")]),
  AuthGuard("admin") as any,
  wrap(updateOrderStatus, "update-order-status")
);

router.delete(AuthGuard("admin"), wrap(deleteOrder, "delete-order"));

export default router;
