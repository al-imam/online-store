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

      for (const validator of validators) {
        if (typeof validator === "string") {
          if (!req.body.hasOwnProperty(validator)) {
            missingItems.push(validator);
            continue;
          }
        }

        if (Array.isArray(validator)) {
          if (!req.body.hasOwnProperty(validator[0]) && config.strict) {
            missingItems.push(validator[0]);
            continue;
          }

          if (!validator[1](req.body[validator[0]])) {
            missingItems.push(validator[0]);
            continue;
          }
        }

        if (validator instanceof Object && !Array.isArray(validator)) {
          if (!req.body.hasOwnProperty(validator.property) && config.strict) {
            missingItems.push(validator.property);
            continue;
          }

          if (!validator.validate(req.body[validator.property])) {
            missingItems.push(validator.property);
            continue;
          }
        }
      }

      if (missingItems.length === 0) return next();

      return res.status(400).json({
        message: "some properties are missing or not valid in request body",
        "missing-properties": missingItems,
      });
    },
    "validate-body"
  );
}

export default validateBody;
