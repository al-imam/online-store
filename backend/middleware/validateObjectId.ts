import { Types } from "mongoose";
import wrap from "@/utility/wrapHandler";

function validateObjectId(ids: string[], validate: "body" | "query" = "body") {
  return wrap(async (req, res, next) => {
    const invalidIds: Record<string, string>[] = [];

    ids.forEach((id) => {
      if (!Types.ObjectId.isValid(req[validate][id])) {
        invalidIds.push({ [id]: req[validate][id] });
      }
    });

    if (invalidIds.length === 0) return next();

    return res.status(400).json({
      code: "invalid-object-id",
      message: "some object id not valid",
      "invalid-object-ids": invalidIds,
    });
  }, "validate-object-id");
}

export default validateObjectId;
