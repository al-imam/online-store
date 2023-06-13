import dbConnect from "@/backend/config/dbConnect";
import createRouter from "next-connect";
import multer from "@/backend/util/multer";
import { NextApiResponse, PageConfig } from "next";
import User from "@/backend/models/user";
import { UserWithId } from "@/types/UserInterface";
import AuthGuard from "@/backend/middleware/AuthGuard";
import { MyRequest } from "@/types/NextApiResponse";

dbConnect();

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter<
  MyRequest<{ $user: UserWithId }>,
  NextApiResponse
>();

router.post(
  AuthGuard(),
  multer("avatar").single("avatar"),
  async (req, res) => {
    const name = Object.assign({}, req.body).name;

    if (!["string", "undefined"].includes(typeof name)) {
      return res.status(400).json({
        code: "update-profile",
        message: "name is not valid",
      });
    }

    const user = await User.findById(req.$user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        code: "update-profile",
        message: "User not found!",
      });
    }

    req.file && (user.avatar = req.file.path.replace("public", ""));
    name && (user.name = name);
    await user.save();

    return res.json(user);
  }
);

export default router;
