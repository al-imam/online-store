import multer, { diskStorage } from "multer";

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
    .replaceAll(", ", "-");
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
