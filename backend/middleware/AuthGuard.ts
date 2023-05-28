import verifyJWTToken from "../util/VerifyJWTToken";
import wrap from "@/utility/wrapHandler";
import { isValidObjectId } from "mongoose";

export default wrap(async ({ headers: { authorization }, body }, res, next) => {
  if (authorization && authorization.startsWith("Bearer ")) {
    const { id } = verifyJWTToken(authorization.replace("Bearer ", ""));
    if (id !== null && isValidObjectId(id)) {
      body._id = id;
      return next();
    }
  }

  return res.status(401).json({
    code: "authorization",
    message: "authorization headers is not valid or not sent",
  });
}, "authorization");
