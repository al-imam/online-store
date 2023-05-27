import createRouter from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { addAddress } from "@/backend/controllers/addressController";

const router = createRouter();

dbConnect();

router.post(addAddress);

export default router;
