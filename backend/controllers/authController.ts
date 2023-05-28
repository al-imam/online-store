import User from "@/backend/models/user";
import wrap from "@/utility/wrapHandler";
import { compareSync } from "bcryptjs";

const singup = wrap(async (req, res) => {
  const user = await User.create(req.body._valid_object);
  res.status(201).json(remove(user));
}, "singup");

const singin = wrap(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    return res.status(400).json({
      code: "singin-failed",
      message: "user not found",
    });
  }

  if (!compareSync(user.password, req.body.password)) {
    return res.status(400).json({
      code: "singin-failed",
      message: "email and password not match",
    });
  }

  res.status(201).json(remove(user));
}, "singin");

function remove({
  name,
  email,
  avatar,
  _id,
  created,
  role,
}: {
  [key: string]: any;
}) {
  return { name, email, avatar, _id, created, role };
}

export { singup };
