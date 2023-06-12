import { verify } from "../util/jwt";
import wrap from "@/utility/wrapHandler";
import { isValidObjectId } from "mongoose";
import User from "@/backend/models/user";
import { UserWithId } from "@/types/UserInterface";
import Prettify from "@/types/Prettify";

function authRole(role: "user" | "admin", userRole: "user" | "admin") {
  if (role === "user") return true;
  return role === userRole;
}

function AuthGuard(role: "user" | "admin" = "user") {
  return wrap<{ $user: UserWithId }>(async (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) {
      const { id } = await verify(auth.replace("Bearer ", ""));

      if (id !== null && isValidObjectId(id)) {
        const user = await User.findById(id).select("-password");

        if (user && authRole(role, user.role)) {
          req.$user = user.toObject();
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
