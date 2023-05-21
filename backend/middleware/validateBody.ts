import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import wrap from "@/utility/wrapHandler";

type ValidateFunction = (value: any) => boolean;

interface ObjectValidate {
  property: string;
  validate: ValidateFunction;
}

type ItemType = string | [string, ValidateFunction] | ObjectValidate;

function validateBody(validators: ItemType[], config = { strict: true }) {
  return wrap(
    async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
      const missingItems: string[] = [];
      const invalidItems: string[] = [];

      for (const validator of validators) {
        if (typeof validator === "string") {
          if (req.body.hasOwnProperty(validator)) continue;
          missingItems.push(validator);
        }

        if (Array.isArray(validator)) {
          if (!req.body.hasOwnProperty(validator[0]) && config.strict) {
            missingItems.push(validator[0]);
          }

          if (!validator[1](req.body[validator[0]])) {
            invalidItems.push(validator[0]);
          }
        }

        if (validator instanceof Object && !Array.isArray(validator)) {
          if (!req.body.hasOwnProperty(validator.property) && config.strict) {
            missingItems.push(validator.property);
          }

          if (!validator.validate(req.body[validator.property])) {
            invalidItems.push(validator.property);
          }
        }
      }

      if (missingItems.length === 0 && invalidItems.length === 0) return next();

      return res.status(400).json({
        message: "some properties are missing or invalid in request body",
        "missing-properties": missingItems,
        "invalid-properties": invalidItems,
      });
    },
    "validate-body"
  );
}

export default validateBody;
