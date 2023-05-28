import verifyJWTToken from "../util/VerifyJWTToken";
import wrap from "@/utility/wrapHandler";
import { isValidObjectId } from "mongoose";

export default wrap(async (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    const { id } = verifyJWTToken(auth.replace("Bearer ", ""));

    if (id !== null && isValidObjectId(id)) {
      if (
        req.body instanceof Object &&
        !Array.isArray(req.body) &&
        req.body !== null
      ) {
        req.body.ID = id;
      } else {
        req.body = { ID: id };
      }
      return next();
    }
  }

  return res.status(401).json({
    code: "authorization",
    message: "authorization headers is not valid or not sent",
  });
}, "authorization");
