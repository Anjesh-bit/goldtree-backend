const { ObjectId } = require("mongodb");
const { mongoClient } = require("../../db/connection");
const {
  getHiringStatusDataService,
} = require("../../services/hiringStatusService");
const deleteJobsService = require("../../services/deleteJobsService");
const database = mongoClient.db("GoldTree");
const collectionPosts = database.collection("EmployeePostJobs");
const upload = database.collection("Upload");

const jobsCount = async (_, res) => {
  try {
    const [totalCount, liveCount, closedCount] = await Promise.all([
      collectionPosts.countDocuments({}),
      collectionPosts.countDocuments({ status: "live" }),
      collectionPosts.countDocuments({ status: "closed" }),
    ]);

    res.status(200).json({
      totalJobs: totalCount,
      liveJobs: liveCount,
      closedJobs: closedCount,
      lastUpdatedOn: new Date().toISOString(),
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Error while counting documents: ${error.message}` });
  }
};

const appliedJobs = async (_, res) => {
  try {
    const foundItems = await getHiringStatusDataService(upload, {});
    res.status(201).json(foundItems);
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database: ${e}` });
  }
};

const expiredJobs = async (_, res) => {
  try {
    const jobs = await collectionPosts.find({ status: "closed" }).toArray();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expired jobs" });
  }
};

const getAllJobListings = async (req, res) => {
  const { limit = 10, lastJobId } = req.query;
  const limitInt = parseInt(limit, 10);

  try {
    const filter = lastJobId ? { _id: { $gt: new ObjectId(lastJobId) } } : {};

    const jobListings = await collectionPosts
      .find(filter)
      .sort({ _id: 1 })
      .limit(limitInt)
      .toArray();

    const hasMore = jobListings.length === limitInt;

    res.status(200).json({
      jobListings,
      hasMore,
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch jobs: ${error.message}` });
  }
};

const deleteAppliedJobs = deleteJobsService(upload);
const deletePostedEmployeeJobs = deleteJobsService(collectionPosts);

module.exports = {
  expiredJobs,
  jobsCount,
  appliedJobs,
  getAllJobListings,
  deleteAppliedJobs,
  deletePostedEmployeeJobs,
};
