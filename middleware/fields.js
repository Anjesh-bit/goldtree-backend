const determineFieldName = (req, res, next) => {
  const fieldName =
    req.query.name === "cv_upload" ? "cv_upload" : "profile_image";
  req.fieldName = fieldName;
  next();
};

module.exports = { determineFieldName };
