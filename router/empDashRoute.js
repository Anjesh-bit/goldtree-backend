const express = require("express");
const empRoute = express.Router();
const {
  profileInfo,
  findAllProfileInfo,
  findOneAndDelete,
  findOneAndUpdate,
  postJob,
  getPostsByUserId,
  profileInfoById,
  findOneAndUpdatePostJobs,
  getAllPosts,
  findByIdAndGet,
} = require("../controller/empDashController");

empRoute.route("/emp-profile-info").post(profileInfo).get(findAllProfileInfo);

empRoute
  .route("/emp-profile-info/:id")
  .delete(findOneAndDelete)
  .put(findOneAndUpdate)
  .get(profileInfoById);

empRoute.route("/emp-post-job-info").post(postJob).get(getAllPosts);
empRoute.route("/get-emp-post-single/:id").get(findByIdAndGet);

empRoute
  .route("/emp-posts-by-id/:id")
  .get(getPostsByUserId)
  .put(findOneAndUpdatePostJobs);

module.exports = empRoute;
