import dbConnect from "@/backend/config/dbConnect";
import createRouter from "next-connect";
import multer from "@/backend/util/multer";
import { PageConfig } from "next";
import COOKIES from "@/utility/COOKIES";
import { verify } from "@/backend/util/jwt";
import { Types } from "mongoose";
import User from "@/backend/models/user";
import { UserInterfaceWithId } from "@/types/UserInterface";
import validate from "nested-object-validate";
import emailRegex from "@/utility/regex";

dbConnect();

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();

function SHOC(
  name: string,
  callback: (value: any) => boolean | string
): [string, (value: any) => string | boolean] {
  return [
    name,
    (value: any) => {
      if (typeof value === "undefined") return true;
      return callback(value);
    },
  ];
}

router.post(
  async (req, res, next) => {
    const cookies = req.cookies[COOKIES];
    const { id } = await verify(cookies);

    if (id !== null && Types.ObjectId.isValid(id)) {
      const u = await User.findById(id);
      if (u !== null) {
        /* @ts-ignore */
        req.$USER = u;
        return next();
      }
    }

    return res.status(401).json({
      code: "authorization",
      message: "authorization headers is not valid or not sent",
    });
  },
  multer.single("avatar"),
  async (req, res) => {
    const { $USER } = req as typeof req & { $USER: UserInterfaceWithId };

    const v = validate(
      Object.assign({}, req.body),
      [
        SHOC("name", (name) => typeof name === "string"),
        SHOC(
          "email",
          (email) =>
            typeof email === "string" && email.match(emailRegex) !== null
        ),
      ],
      {
        strict: false,
      }
    );

    if (!v.valid) {
      return res.status(400).json({
        message: "some properties are missing or invalid",
        missing: v.missing,
        invalid: v.invalid,
      });
    }

    res.json(req.file);
  }
);

export default router;
