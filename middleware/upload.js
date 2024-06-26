const dotenv = require("dotenv");
const path = require("node:path");
const multer = require("multer");
dotenv.config();

const MULTER_PATH = process.env.MULTER_PATH;

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, MULTER_PATH);
  },
  filename: (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop();
    cb(
      null,
      `${
        req.query.name == "cv_upload"
          ? `document-${Date.now()}.${fileExt}`
          : `image-${Date.now()}.${fileExt}`
      }`
    );
  },
});

const multerValidation = (req, file, cb) => {
  const allowedExtensions =
    req.query.name === "cv_upload"
      ? ["pdf", "doc", "docx"]
      : ["gif", "png", "svg", "jpeg", "jpg"];

  const fileExt = file.originalname.split(".").pop().toLowerCase();

  // Check if the file extension is in the allowed list
  if (allowedExtensions.includes(fileExt)) {
    return cb(null, true);
  }

  return cb(
    new Error(
      `${
        req.query.name === "cv_upload"
          ? "Only PDF, DOC, DOCX files are allowed"
          : "Only GIF, JPEG, JPG , SVG PNG are allowed"
      }`
    )
  );
};

const multerDocSizeLimit = {
  fileSize: 8 * 1024 * 1024, // 8 MB limit
};

const multerConfig = multer({
  storage: multerStorage,
  limits: multerDocSizeLimit,
  fileFilter: multerValidation,
});

const multerSingleUpload = (fieldName) => multerConfig.single(fieldName);

module.exports = { multerSingleUpload };
