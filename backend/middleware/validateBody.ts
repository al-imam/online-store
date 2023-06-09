import wrap from "@/utility/wrapHandler";
import { validate, ValidatorType } from "nested-object-validate";

function validateBody(
  validators: ValidatorType[],
  config?: { strict: boolean }
) {
  return wrap(async (req, res, next) => {
    if (!(req.body instanceof Object && !Array.isArray(req.body))) {
      return res.status(400).json({
        code: "not-object",
        message: "request body is not object only accept's object",
      });
    }

    const result = validate(req.body, validators, config);

    if (result.valid) {
      if (
        req.body.VALID_REQ !== null &&
        req.body.VALID_REQ instanceof Object &&
        !Array.isArray(req.body.VALID_REQ)
      ) {
        req.body.VALID_REQ = Object.assign(req.body.VALID_REQ, result.checked);
      } else if (
        req.body instanceof Object &&
        !Array.isArray(req.body) &&
        req.body !== null
      ) {
        req.body.VALID_REQ = result.checked;
      } else {
        req.body = { VALID_REQ: result.checked };
      }

      return next();
    }

    return res.status(400).json({
      message: "some properties are missing or invalid",
      missing: result.missing,
      invalid: result.invalid,
    });
  }, "validate-body");
}

export default validateBody;
