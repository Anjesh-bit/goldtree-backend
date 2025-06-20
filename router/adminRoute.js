const express = require("express");
const {
  jobsCount,
  getAllJobListings,
  appliedJobs,
  deleteAppliedJobs,
  deletePostedEmployeeJobs,
  expiredJobs,
} = require("../controller/admin/adminController");

const adminRouter = express.Router();

adminRouter.get("/admin-dashboard-jobs-count", jobsCount);
adminRouter.get("/job-listing", getAllJobListings);
adminRouter.get("/applied-jobs", appliedJobs);
adminRouter.delete("/delete-applied-jobs", deleteAppliedJobs);
adminRouter.delete("/delete-posted-jobs", deletePostedEmployeeJobs);
adminRouter.get("/expired-jobs", expiredJobs);
module.exports = adminRouter;
