const express = require("express");
const empRoute = express.Router();
const {
  profileInfo,
  findAllProfileInfo,
  findOneAndDelete,
  findOneAndUpdate,
  getPostsByUserId,
  profileInfoById,
  findOneAndUpdatePostJobs,
  findByIdAndGet,
  shortListedCandidates,
  getAllCandidateEasyApplied,
} = require("../controller/empDashController");
const { uploadFile } = require("../controller/jobSeekerController");
const { determineFieldName } = require("../middleware/fields");
const { dynamicUpload } = require("../middleware/dynamicUpload");

empRoute.route("/emp-profile-info").post(profileInfo).get(findAllProfileInfo);

empRoute
  .route("/emp-profile-info/:id")
  .delete(findOneAndDelete)
  .put(findOneAndUpdate)
  .get(profileInfoById);

empRoute
  .route("/upload")
  .post(determineFieldName, dynamicUpload, uploadFile)
  .get(getAllCandidateEasyApplied);
empRoute
  .route("/emp-posts-by-id/:id")
  .get(getPostsByUserId)
  .put(findOneAndUpdatePostJobs);

empRoute.route("/short-listed-candidates").get(shortListedCandidates);

module.exports = empRoute;
