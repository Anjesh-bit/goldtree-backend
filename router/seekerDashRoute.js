const express = require("express");
const jobseekerRoute = express.Router();
const {
  profilInfo,
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

jobseekerRoute.route("/jobseeker-profile-info").post(profilInfo);

jobseekerRoute
  .route("/jobseeker-profile-info/:id")
  .get(profileInfoById)
  .put(findOneAndUpdate);

jobseekerRoute
  .route("/upload")
  .post(determineFieldName, dynamicUpload, uploadFile)
  .get(getAllCandidateEasyApplied);

jobseekerRoute.route("/shortlist").put(uploadFile).get(shortListedJobs);

jobseekerRoute
  .route("/profile-update")
  .put(determineFieldName, dynamicUpload, profileUpdate);

jobseekerRoute.route("/save-jobs").put(saveJobs);
jobseekerRoute.route("/save-jobs/:jobSeekUserId").get(getsaveJobs);

jobseekerRoute.route("/jobSeeker-applied-jobs").get(appliedJobsByUserId);
jobseekerRoute.route("/profile-update").post(uploadProfile);
jobseekerRoute.route("/search").get(globalSearch);

module.exports = jobseekerRoute;
