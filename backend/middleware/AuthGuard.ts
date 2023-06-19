import { verify } from "$backend/util/jwt";
import User from "$models/User";
import { UserWithId } from "$types/UserInterface";
import COOKIES from "$utility/COOKIES";
import wrap from "$utility/wrapHandler";
import { isValidObjectId } from "mongoose";

function authRole(role: "user" | "admin", userRole: "user" | "admin") {
  if (role === "user") return true;
  return role === userRole;
}

function getAuthToken(
  authorization: string | undefined,
  cookies: string | undefined
) {
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }

  return cookies;
}

function AuthGuard(role: "user" | "admin" = "user") {
  return wrap<{ $user: UserWithId }>(async (req, res, next) => {
    const authorization = getAuthToken(
      req.headers.authorization,
      req.cookies[COOKIES]
    );

    if (authorization) {
      const { id } = await verify(authorization);
      if (id && isValidObjectId(id)) {
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
