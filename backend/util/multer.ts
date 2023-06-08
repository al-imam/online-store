import multer, { diskStorage } from "multer";
import uuid from "@/utility/uuid";

const time = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  second: "2-digit",
  month: "2-digit",
  year: "numeric",
  minute: "2-digit",
  hour: "2-digit",
});

function getTime() {
  return time
    .format(new Date())
    .slice(0, -3)
    .replaceAll("/", "-")
    .replaceAll(":", "-")
    .replaceAll(", ", "_");
}

export default multer({
  storage: diskStorage({
    destination: function (req, file, callback) {
      callback(null, "public/saves");
    },

    filename: function (req, { originalname }, callback) {
      callback(
        null,
        `${getTime()}_${uuid()}.${originalname.split(".").at(-1)}`
      );
    },
  }),

  fileFilter(_, file, callback) {
    callback(undefined as any, file.mimetype.includes("image/"));
  },
});
