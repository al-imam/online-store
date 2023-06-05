import { verify } from "../util/jwt";
import wrap from "@/utility/wrapHandler";
import { isValidObjectId } from "mongoose";
import User from "@/backend/models/user";

const AuthGuard = wrap(async (req, res, next) => {
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
}, "authorization");

export default AuthGuard;
