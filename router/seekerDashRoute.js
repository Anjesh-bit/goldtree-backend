const express = require("express");
const jobSeekerRoute = express.Router();
const {
  profileInfo,
  handleJobApplication,
  findOneAndUpdate,
  profileInfoById,
  appliedJobsByUserId,
  uploadProfile,
  shortListedJobs,
  saveJobs,
  getSavedJobs,
} = require("../controller/jobSeekerController");
const { profileUpdate } = require("../controller/dynamicController");
const { determineFieldName } = require("../middleware/fields");
const { dynamicUpload } = require("../middleware/dynamicUpload");
const { updateHiringStatus } = require("../controller/empDashController");

jobSeekerRoute.route("/jobseeker-profile-info").post(profileInfo);

jobSeekerRoute
  .route("/jobseeker-profile-info/:id")
  .get(profileInfoById)
  .put(findOneAndUpdate);

jobSeekerRoute.route("/get-shortlisted-jobs").get(shortListedJobs);

jobSeekerRoute
  .route("/profile-update")
  .put(determineFieldName, dynamicUpload, profileUpdate);

jobSeekerRoute.route("/save-jobs").put(saveJobs);
jobSeekerRoute.route("/save-jobs/:jobSeekUserId").get(getSavedJobs);

jobSeekerRoute.route("/jobSeeker-applied-jobs").get(appliedJobsByUserId);
jobSeekerRoute.route("/profile-update").post(uploadProfile);

module.exports = jobSeekerRoute;
