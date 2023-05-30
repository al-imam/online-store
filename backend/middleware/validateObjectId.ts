import { Types } from "mongoose";
import wrap from "@/utility/wrapHandler";

function validateObjectId(ids: string[], validate: "body" | "query" = "body") {
  return wrap(async (req, res, next) => {
    const invalidIds: Record<string, string>[] = [];
    const valid: Record<string, string> = {};

    ids.forEach((id) => {
      if (!Types.ObjectId.isValid(req[validate][id])) {
        invalidIds.push({ [id]: req[validate][id] });
      } else {
        valid[id] = req[validate][id];
      }
    });

    if (invalidIds.length === 0) {
      if (
        req.body.VALID_REQ instanceof Object &&
        !Array.isArray(req.body.VALID_REQ)
      ) {
        req.body.VALID_REQ = Object.assign(req.body.VALID_REQ, valid);
      }

      if (req.body.VALID_REQ === undefined) {
        req.body.VALID_REQ = valid;
      }

      return next();
    }

    return res.status(400).json({
      code: "invalid-object-id",
      message: "some object id not valid",
      invalid: invalidIds,
    });
  }, "validate-object-id");
}

export default validateObjectId;
