import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import wrap from "@/utility/wrapHandler";

function validateBody(properties: string[]) {
  return wrap(
    async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
      const missingItems: string[] = [];

      properties.forEach((property) => {
        if (!req.body.hasOwnProperty(property)) {
          missingItems.push(property);
        }
      });

      if (missingItems.length === 0) return next();

      return res.status(400).json({
        message: "some properties are missing in request body",
        "missing-property": missingItems,
      });
    },
    "validate-body"
  );
}

export default validateBody;
