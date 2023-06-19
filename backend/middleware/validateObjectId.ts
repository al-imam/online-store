import wrap from "$utility/wrapHandler";
import { Types } from "mongoose";

function validateObjectId(ids: string[], validate: "body" | "query" = "body") {
  return wrap<{ $data: Record<string, any> }>(async (req, res, next) => {
    const invalidIds: Record<string, string>[] = [];
    const valid: Record<string, any> = {};

    ids.forEach((id) => {
      if (!Types.ObjectId.isValid(req[validate][id])) {
        invalidIds.push({ [id]: req[validate][id] });
      } else {
        valid[id] = req[validate][id];
      }
    });

    if (invalidIds.length === 0) {
      if (
        typeof req.$data === "object" &&
        !Array.isArray(req.$data) &&
        req.$data !== null
      ) {
        req.$data = Object.assign(req.$data, valid);
      } else {
        req.$data = valid;
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
