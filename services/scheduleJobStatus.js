const JOB_STATUS = require("../constant/appConstant");
const { mongoClient } = require("../db/connection");

const database = mongoClient.db("GoldTree");
const collectionPosts = database.collection("EmployeePostJobs");
const PAGE_SIZE = 1000;

const scheduleJobStatus = async () => {
  try {
    let hasMoreData = true;
    let skip = 0;

    while (hasMoreData) {
      const jobs = await collectionPosts
        .find({ status: JOB_STATUS.LIVE })
        .skip(skip)
        .limit(PAGE_SIZE)
        .toArray();

      if (jobs.length === 0) {
        hasMoreData = false;
        break;
      }

      const expiredJobs = jobs.filter((job) => {
        const { apply_before: applyBeforeDays } = job;
        const createdAt = job._id.getTimestamp();

        return getExpirationDatePost(applyBeforeDays, createdAt);
      });

      if (expiredJobs.length > 0) {
        const expiredJobIds = expiredJobs.map((job) => job._id);
        await collectionPosts.updateMany(
          { _id: { $in: expiredJobIds } },
          { $set: { status: JOB_STATUS.CLOSED, updatedAt: new Date() } }
        );
      }

      skip += PAGE_SIZE;
    }
  } catch (error) {
    console.error("Error in cron job execution:", error);
  }
};

module.exports = scheduleJobStatus;
