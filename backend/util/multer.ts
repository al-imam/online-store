import multer, { diskStorage } from "multer";

export default multer({
  storage: diskStorage({
    destination: function (req, file, callback) {
      callback(null, "public/saves");
    },
    filename: function (req, file, callback) {
      callback(null, `{${new Date().toDateString()}-${file.originalname}`);
    },
  }),

  fileFilter(req, file, callback) {
    callback(null, ["jpeg", "png", "jpg"].includes(file.mimetype));
  },
});
