import User from "@/backend/models/user";
import wrap from "@/utility/wrapHandler";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

const singup = wrap(async (req, res) => {
  const user = await User.create(req.body._valid_object);

  res.status(201).json({
    user: remove(user),
    auth: sign({ id: user._id }, process.env.JWT_SECRET as string),
  });
}, "singup");

const singin = wrap(async (req, res) => {
  const { email, password } = req.body._valid_object;

  const user = await User.findOne({ email });

  if (user === null) {
    return res.status(400).json({
      code: "singin-failed",
      message: "user not found",
    });
  }

  if (!compareSync(password, user.password)) {
    return res.status(400).json({
      code: "singin-failed",
      message: "email and password not match",
    });
  }

  res.status(200).json({
    user: remove(user),
    auth: sign({ id: user._id }, process.env.JWT_SECRET as string),
  });
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

export { singup, singin };
