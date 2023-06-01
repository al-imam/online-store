import multer, { diskStorage } from "multer";
import crypto from "crypto";

const generateUuid = () => {
  return [4, 2, 2, 2, 6]
    .map((group) => crypto.randomBytes(group).toString("hex"))
    .join("-");
};

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
        `${originalname
          .trim()
          .toLowerCase()
          .replaceAll(" ", "")
          .replaceAll("\n", "")}-${getTime()}`
      );
    },
  }),

  fileFilter(req, file, callback) {
    callback(null, ["jpeg", "png", "jpg"].includes(file.mimetype));
  },
});
