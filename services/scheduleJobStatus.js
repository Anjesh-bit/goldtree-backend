const { JOB_STATUS, HIRING_STATUS } = require("../constant/appConstant");

const { mongoClient } = require("../db/connection");

const database = mongoClient.db("GoldTree");
const collectionPosts = database.collection("EmployeePostJobs");
const upload = database.collection("Upload");
const PAGE_SIZE = 1000;

collectionPosts.createIndex({ updatedAt: 1 });
collectionPosts.createIndex({ status: 1, apply_before: 1 });

const scheduleJobStatus = async () => {
  try {
    let hasMoreData = true;
    let lastProcessedId = null;

    while (hasMoreData) {
      const jobs = await collectionPosts
        .aggregate([
          { $match: { status: JOB_STATUS.LIVE } },
          {
            $addFields: {
              expirationDate: {
                $add: [
                  { $toDate: "$_id" },
                  { $multiply: ["$apply_before", 24 * 60 * 60 * 1000] },
                ],
              },
            },
          },
          { $match: { expirationDate: { $lte: new Date() } } },
          {
            $match: lastProcessedId ? { _id: { $gt: lastProcessedId } } : {},
          },
          { $limit: PAGE_SIZE },
          { $project: { _id: 1 } },
        ])
        .toArray();

      if (jobs.length === 0) {
        hasMoreData = false;
        break;
      }

      const bulkOperations = jobs.map((job) => ({
        updateOne: {
          filter: { _id: job._id },
          update: {
            $set: { status: JOB_STATUS.CLOSED, updatedAt: new Date() },
          },
        },
      }));

      await collectionPosts.bulkWrite(bulkOperations);

      lastProcessedId = jobs[jobs.length - 1]._id;
    }
    //five days of inactivity change job status to pending only if admin approved.
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const closedPostIds = await collectionPosts
      .aggregate([
        {
          $match: {
            status: JOB_STATUS.CLOSED,
            updatedAt: { $lte: fiveDaysAgo },
          },
        },
        { $project: { _id: 1 } },
      ])
      .toArray()
      .then((jobs) => jobs.map((job) => job._id));

    const updateResult = await upload.updateMany(
      {
        status: "waiting",
        postId: { $in: closedPostIds },
      },
      {
        $set: {
          status: JOB_STATUS.PENDING,
          updatedAt: new Date(),
        },
      }
    );

    console.log(`✅ Updated ${updateResult.modifiedCount} uploads to PENDING.`);
  } catch (error) {
    console.error("❌ Error in cron job execution:", error);
  }
};

module.exports = scheduleJobStatus;
