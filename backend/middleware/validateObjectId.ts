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
        req.body.VALID_ID !== null &&
        req.body.VALID_ID instanceof Object &&
        !Array.isArray(req.body.VALID_ID)
      ) {
        req.body.VALID_ID = Object.assign(req.body.VALID_ID, valid);
      } else if (
        req.body instanceof Object &&
        !Array.isArray(req.body) &&
        req.body !== null
      ) {
        req.body.VALID_ID = valid;
      } else {
        req.body = { VALID_ID: valid };
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
