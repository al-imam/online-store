import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import wrap from "@/utility/wrapHandler";

type ValidateFunction = (value: any) => boolean;

interface ObjectValidate {
  property: string;
  validate: ValidateFunction;
}

type ItemType = string | [string, ValidateFunction] | ObjectValidate;

function validateBody(items: ItemType[]) {
  return wrap(
    async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
      const missingItems: any[] = [];

      items.forEach((item) => {
        if (typeof item === "string") {
          if (!req.body.hasOwnProperty(item)) {
            missingItems.push(item);
          }
        }
      });

      if (missingItems.length === 0) return next();

      return res.status(400).json({
        message: "some properties are missing or not valid in request body",
        "missing-property": missingItems,
      });
    },
    "validate-body"
  );
}

export default validateBody;
