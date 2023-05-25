import wrap from "@/utility/wrapHandler";
import validate from "nested-object-validate";
import { ValidatorType } from "nested-object-validate/dist/types";

function validateBody(validators: ValidatorType[], config = { strict: true }) {
  return wrap(async (req, res, next) => {
    if (!(req.body instanceof Object && !Array.isArray(req.body))) {
      return res.status(400).json({
        code: "not-object",
        message: "request body is not object only accept's object",
      });
    }

    const result = validate(req.body, validators);

    if (result.valid) {
      if (
        req.body._valid_object instanceof Object &&
        !Array.isArray(req.body._valid_object)
      ) {
        req.body._valid_object = Object.assign(
          req.body._valid_object,
          result.checked
        );
      }

      if (req.body._valid_object === undefined) {
        req.body._valid_object = result.checked;
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
