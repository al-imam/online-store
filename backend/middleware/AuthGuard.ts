import { verify } from "../util/jwt";
import wrap from "@/utility/wrapHandler";
import { isValidObjectId } from "mongoose";
import User from "@/backend/models/user";
import { NextHandler } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

function AuthGuard(role: string = "user") {
  return wrap(async (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) {
      const { id } = await verify(auth.replace("Bearer ", ""));

      if (id !== null && isValidObjectId(id)) {
        const $USER = await User.findById(id).select("-password");

        if ($USER && $USER.role === role) {
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
      message: "authorization headers not sent or user don't have permission!",
    });
  });
}

export default AuthGuard;
