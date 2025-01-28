const express = require("express");
const empRoute = express.Router();
const {
  profileInfo,
  findOneAndDelete,
  findOneAndUpdate,
  profileInfoById,
  findOneAndUpdatePostJobs,
  shortListedCandidates,
  getAllCandidateEasyApplied,
  getJobByStatus,
  updateHiringStatus,
} = require("../controller/empDashController");

const { handleJobApplication } = require("../controller/jobSeekerController");
const { determineFieldName } = require("../middleware/fields");
const { dynamicUpload } = require("../middleware/dynamicUpload");

empRoute.route("/emp-profile-info").post(profileInfo);

empRoute
  .route("/emp-profile-info/:id")
  .delete(findOneAndDelete)
  .put(findOneAndUpdate)
  .get(profileInfoById);

empRoute
  .route("/upload")
  .post(determineFieldName, dynamicUpload, handleJobApplication)
  .get(getAllCandidateEasyApplied);

empRoute
  .route("/emp-posts-by-id")
  .get(getJobByStatus)
  .put(findOneAndUpdatePostJobs);

empRoute.route("/short-listed-candidates").get(shortListedCandidates);
empRoute.route("/update-job-hiring-status").put(updateHiringStatus);

module.exports = empRoute;
