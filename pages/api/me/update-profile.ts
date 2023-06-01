import dbConnect from "@/backend/config/dbConnect";
import createRouter from "next-connect";
import multer from "@/backend/util/multer";
import { PageConfig } from "next";

dbConnect();

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();

router.post(multer.single("avatar"), (req, res) => {
  console.log(req.file, req.body);
});

export default router;
