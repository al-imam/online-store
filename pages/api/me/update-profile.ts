import dbConnect from "@/backend/config/dbConnect";
import createRouter from "next-connect";
import multer from "@/backend/util/multer";
import { PageConfig } from "next";
import COOKIES from "@/utility/COOKIES";
import { verify } from "@/backend/util/jwt";
import { Types } from "mongoose";
import User from "@/backend/models/user";

dbConnect();

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();

router.post(
  async (req, res, next) => {
    const cookies = req.cookies[COOKIES];
    const { id } = await verify(cookies);

    if (id !== null && Types.ObjectId.isValid(id)) {
      const u = await User.findById(id);
      if (u !== null) {
        /* @ts-ignore */
        req.$USER = u;
        return next();
      }
    }

    return res.status(401).json({
      code: "authorization",
      message: "authorization headers is not valid or not sent",
    });
  },
  multer.single("avatar"),
  (req, res) => {
    /* @ts-ignore */
    console.log(req.$USER);
    res.json(req.file);
  }
);

export default router;
