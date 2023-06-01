import { v2 } from "cloudinary";

v2.config({
  cloud_name: process.env.SETUP_PLEASE,
  api_key: process.env.SETUP_PLEASE,
  api_secret: process.env.SETUP_PLEASE,
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
          resolve({
            id: result.public_id,
            url: result.url,
          });
        }

        reject(err);
      }
    );
  });
}
