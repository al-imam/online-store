import dbConnect from "$backend/config/dbConnect";
import {
  deleteOrder,
  singleCustomerOrder,
  updateOrderStatus,
} from "$controllers/orderController";
import AuthGuard from "$middleware/AuthGuard";
import validateBody from "$middleware/validateBody";
import validateObjectId from "$middleware/validateObjectId";
import { MyRequest } from "$types/NextApiResponse";
import wrap from "$utility/wrapHandler";
import { isString } from "nested-object-validate";
import createRouter from "next-connect";

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
