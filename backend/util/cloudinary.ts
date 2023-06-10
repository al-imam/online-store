import { v2 } from "cloudinary";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default function (
  file: string,
  folder: string
): Promise<{ id: string; url: string }> {
  return new Promise((resolve, reject) => {
    v2.uploader.upload(
      file,

      {
        resource_type: "auto",
        folder: folder,
      },

      (err, result) => {
        if (result !== undefined) {
          return resolve({
            id: result.public_id,
            url: result.url,
          });
        }

        reject(err);
      }
    );
  });
}
