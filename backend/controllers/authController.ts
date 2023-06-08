import User from "@/backend/models/user";
import { compareSync } from "bcryptjs";
import { sign } from "../util/jwt";
import { setCookie } from "cookies-next";
import COOKIES from "@/utility/COOKIES";
import { NextApiRequest, NextApiResponse } from "next";

export async function singup(req: NextApiRequest, res: NextApiResponse) {
  const user = await User.create(req.body.VALID_REQ);

  const jwt = await sign({ id: user._id, role: user.role });

  setCookie(COOKIES, jwt, { req, res });

  res.status(201).json({
    user: remove(user),
    auth: jwt,
  });
}

export async function singin(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body.VALID_REQ;

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

  const jwt = await sign({ id: user._id, role: user.role });

  setCookie(COOKIES, jwt, { req, res });

  res.status(200).json({
    user: remove(user),
    auth: jwt,
  });
}

export async function update(req: NextApiRequest, res: NextApiResponse) {
  const user = await User.findById(req.body.$USER._id);

  if (user !== null) {
    if (compareSync(req.body.VALID_REQ.current, user.password)) {
      user.password = req.body.VALID_REQ.password;

      await user.save();
      return res.status(200).json({
        code: "success",
        message: "password updated successfully!",
      });
    }
  }

  return res.status(401).json({
    code: "password-not-match",
    message: "current password not match!",
  });
}

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
