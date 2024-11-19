const express = require("express");
const {
  getAllPosts,
  postJob,
  findByIdAndGet,
} = require("../controller/empDashController");
const publicRoute = express.Router();

publicRoute.route("/emp-post-job-info").post(postJob).get(getAllPosts);
publicRoute.route("/get-emp-post-single").get(findByIdAndGet);

module.exports = publicRoute;
