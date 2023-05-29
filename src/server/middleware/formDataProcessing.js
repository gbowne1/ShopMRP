const multer = require("multer");

const storage = multer.memoryStorage();

// add filter for image file types only
// TODO: limit size of file to upload
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Only image file types can be uploaded.", false);
  }
};

const upload = multer({ storage: storage, fileFilter: multerFilter });

const uploadFile = upload.array("photo", 1);

const uploadPhoto = (req, res, next) => {
  uploadFile(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(500).json({ error: "Too many files to upload." });
      }
    } else if (err) {
      return res.status(500).json({ error: err });
    }
    next();
  });
};

module.exports = uploadPhoto;
