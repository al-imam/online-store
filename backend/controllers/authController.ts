import { sign } from "$backend/util/jwt";
import User from "$models/User";
import { MyRequest } from "$types/NextApiResponse";
import { UserWithId } from "$types/UserInterface";
import COOKIES from "$utility/COOKIES";
import { compareSync } from "bcryptjs";
import { setCookie } from "cookies-next";
import { NextApiResponse } from "next";

export async function singup(
  req: MyRequest<{ $data: Record<"password" | "name" | "email", string> }>,
  res: NextApiResponse
) {
  const user = await User.create(req.$data);

  const jwt = await sign({ id: user._id, role: user.role });

  setCookie(COOKIES, jwt, { req, res });

  res.status(201).json({
    user: remove(user),
    auth: jwt,
  });
}

export async function singin(
  req: MyRequest<{ $data: { email: string; password: string } }>,
  res: NextApiResponse
) {
  const { email, password } = req.$data;

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

export async function update(
  req: MyRequest<{
    $user: UserWithId;
    $data: { current: string; password: string };
  }>,
  res: NextApiResponse
) {
  const user = await User.findById(req.$user._id);

  if (user !== null) {
    if (compareSync(req.$data.current, user.password)) {
      user.password = req.$data.password;

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
