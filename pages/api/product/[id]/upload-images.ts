import dbConnect from "@/backend/config/dbConnect";
import multer from "@/backend/util/multer";
import createRouter from "next-connect";
import { NextApiResponse } from "next";
import { UserWithId } from "@/types/UserInterface";
import AuthGuard from "@/backend/middleware/AuthGuard";
import { MyRequest } from "@/types/NextApiResponse";
import Product from "@/backend/models/product";
import { isValidObjectId } from "mongoose";
import { unlinkSync } from "fs";
import uuid from "@/utility/uuid";
import wrap from "@/utility/wrapHandler";

dbConnect();

const router = createRouter<
  MyRequest<{ $user: UserWithId }>,
  NextApiResponse
>();

function listUnlink(arr: FilePaths[]) {
  arr.forEach((p) => unlinkSync(p.url));
}

export const config = {
  api: {
    bodyParser: false,
  },
};

interface FilePaths {
  id: string;
  url: string;
}

router.post(
  AuthGuard("admin"),
  multer("products").array("images"),
  wrap(async (req, res) => {
    const files = Array.isArray(req.files)
      ? req.files.map((f) => ({ id: uuid(), url: f.path }))
      : [];

    if (!isValidObjectId(req.query.id)) {
      listUnlink(files);
      return res.status(400).json({
        code: "upload-images",
        message: "Query is not valid!",
      });
    }

    const doc = await Product.findById(req.query.id);

    if (!doc) {
      listUnlink(files);
      return res.status(404).json({
        code: "upload-images",
        message: "Product not found!",
      });
    }

    doc.images = files.map((file) => {
      if (file.url.includes("public")) {
        return {
          id: file.id,
          url: file.url.replace("public", ""),
        };
      }
      return file;
    });

    await doc.save();

    res.status(200).json({ success: true });
  })
);

export default router;
