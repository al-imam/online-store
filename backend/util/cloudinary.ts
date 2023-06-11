import { v2 } from "cloudinary";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function cloudUpload(file: string, folder: string) {
  return v2.uploader.upload(file, {
    resource_type: "auto",
    folder: folder,
  });
}

export async function uploadAvatar(file: string) {
  return cloudUpload(file, "online-store/avatar");
}

export const cloudinary = v2;
