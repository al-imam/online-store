import wrap from "@/utility/wrapHandler";

type ValidateFunction = (value: any) => boolean;

interface ObjectValidate {
  property: string;
  validate: ValidateFunction;
}

type ItemType = string | [string, ValidateFunction] | ObjectValidate;

function validateBody(validators: ItemType[], config = { strict: true }) {
  return wrap(async (req, res, next) => {
    if (!(req.body instanceof Object && !Array.isArray(req.body))) {
      return res.status(400).json({
        code: "not-object",
        message: "request body is not object only accept's object",
      });
    }

    const missings: string[] = [];
    const invalids: string[] = [];
    const valids: { [key: string]: any } = {};

    for (const validator of validators) {
      if (typeof validator === "string") {
        if (req.body.hasOwnProperty(validator)) {
          valids[validator] = req.body[validator];
          continue;
        }

        missings.push(validator);
      }

      if (Array.isArray(validator)) {
        if (!req.body.hasOwnProperty(validator[0]) && config.strict) {
          missings.push(validator[0]);
          continue;
        }

        if (!validator[1](req.body[validator[0]])) {
          invalids.push(validator[0]);
          continue;
        }

        if (req.body[validator[0]] === undefined) continue;
        valids[validator[0]] = req.body[validator[0]];
      }

      if (validator instanceof Object && !Array.isArray(validator)) {
        if (!req.body.hasOwnProperty(validator.property) && config.strict) {
          missings.push(validator.property);
          continue;
        }

        if (!validator.validate(req.body[validator.property])) {
          invalids.push(validator.property);
          continue;
        }

        if (req.body[validator.property] === undefined) continue;
        valids[validator.property] = req.body[validator.property];
      }
    }

    if (missings.length === 0 && invalids.length === 0) {
      if (
        req.body._valid_object instanceof Object &&
        !Array.isArray(req.body._valid_object)
      ) {
        req.body._valid_object = Object.assign(req.body._valid_object, valids);
      }

      if (req.body._valid_object === undefined) {
        req.body._valid_object = valids;
      }

      return next();
    }

    return res.status(400).json({
      message: "some properties are missing or invalid in request body",
      "missing-properties": missings,
      "invalid-properties": invalids,
    });
  }, "validate-body");
}

export default validateBody;
