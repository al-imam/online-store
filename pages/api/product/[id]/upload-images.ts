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

router.post(AuthGuard("admin"), multer("products").array("images"));

export default router;
