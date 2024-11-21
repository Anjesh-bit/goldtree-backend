const express = require("express");
const {
  getAllPosts,
  postJob,
  findByIdAndGet,
  findAllProfileInfo,
  findEmployeeProfileById,
} = require("../controller/empDashController");
const { globalSearch } = require("../controller/searchController");
const publicRoute = express.Router();

publicRoute.route("/emp-post-job-info").post(postJob).get(getAllPosts);
publicRoute.route("/get-emp-post-single").get(findByIdAndGet);
publicRoute.route("/search").get(globalSearch);
publicRoute.route("/emp-profile-info").get(findAllProfileInfo);
publicRoute.route("/emp-profile-information/:id").get(findEmployeeProfileById);

module.exports = publicRoute;
