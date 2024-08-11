const express = require("express");
const jobSeekerRoute = express.Router();
const {
  profileInfo,
  uploadFile,
  getAllCandidateEasyApplied,
  findOneAndUpdate,
  profileInfoById,
  appliedJobsByUserId,
  uploadProfile,
  shortListedJobs,
  saveJobs,
  getsaveJobs,
} = require("../controller/jobSeekerController");
const { profileUpdate } = require("../controller/dynamicController");
const { determineFieldName } = require("../middleware/fields");
const { dynamicUpload } = require("../middleware/dynamicUpload");
const { globalSearch } = require("../controller/searchController");

jobSeekerRoute.route("/jobseeker-profile-info").post(profileInfo);

jobSeekerRoute
  .route("/jobseeker-profile-info/:id")
  .get(profileInfoById)
  .put(findOneAndUpdate);

jobSeekerRoute
  .route("/upload")
  .post(determineFieldName, dynamicUpload, uploadFile)
  .get(getAllCandidateEasyApplied);

jobSeekerRoute.route("/shortlist").put(uploadFile).get(shortListedJobs);

jobSeekerRoute
  .route("/profile-update")
  .put(determineFieldName, dynamicUpload, profileUpdate);

jobSeekerRoute.route("/save-jobs").put(saveJobs);
jobSeekerRoute.route("/save-jobs/:jobSeekUserId").get(getsaveJobs);

jobSeekerRoute.route("/jobSeeker-applied-jobs").get(appliedJobsByUserId);
jobSeekerRoute.route("/profile-update").post(uploadProfile);
jobSeekerRoute.route("/search").get(globalSearch);

module.exports = jobSeekerRoute;
