const { multerSingleUpload } = require("./upload");

const dynamicUpload = (req, res, next) => {
  multerSingleUpload(req.fieldName)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

module.exports = { dynamicUpload };
