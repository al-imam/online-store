import dbConnect from "@/backend/config/dbConnect";
import createRouter from "next-connect";
import multer from "@/backend/util/multer";
import { PageConfig } from "next";
import COOKIES from "@/utility/COOKIES";
import { verify } from "@/backend/util/jwt";
import { Types } from "mongoose";
import User from "@/backend/models/user";
import { UserWithId } from "@/types/UserInterface";

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

    if (id && Types.ObjectId.isValid(id)) {
      const user = await User.findById(id);
      if (user) {
        /* @ts-ignore */
        req.$USER = user;
        return next();
      }
    }

    return res.status(401).json({
      code: "authorization",
      message: "authorization headers is not valid or not sent",
    });
  },
  multer.single("avatar"),
  async (req, res) => {
    const { $USER } = req as typeof req & { $USER: UserWithId };
    const name = Object.assign({}, req.body).name;

    if (!["string", "undefined"].includes(typeof name)) {
      return res.status(400).json({
        code: "update-profile",
        message: "name is not valid",
      });
    }

    const user = await User.findById($USER._id).select("-password");

    if (user) {
      user.name = name ?? user.name;
      await user.save();
      return res.status(200).json(user);
    }

    return res.status(404).json({
      code: "update-profile",
      message: "User not found!",
    });
  }
);

export default router;
