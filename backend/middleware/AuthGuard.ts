import { verify } from "../util/jwt";
import wrap from "@/utility/wrapHandler";
import { isValidObjectId } from "mongoose";
import User from "@/backend/models/user";
import { NextHandler } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

async function authGuard(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    const { id } = await verify(auth.replace("Bearer ", ""));

    if (id !== null && isValidObjectId(id)) {
      const $USER = await User.findById(id).select("-password");

      if ($USER !== null) {
        if (
          req.body instanceof Object &&
          !Array.isArray(req.body) &&
          req.body !== null
        ) {
          req.body.$USER = $USER;
        } else {
          req.body = { $USER };
        }
        return next();
      }
    }
  }

  return res.status(401).json({
    code: "authorization",
    message: "authorization headers is not valid or not sent",
  });
}

export default wrap(authGuard, "authorization");
