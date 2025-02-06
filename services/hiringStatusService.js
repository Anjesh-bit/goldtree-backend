const { HIRING_STATUS } = require("../constant/appConstant");

const getHiringStatus = (query) => {
  switch (query) {
    case HIRING_STATUS.ACCEPTED:
      return HIRING_STATUS.ACCEPTED;
    case HIRING_STATUS.REJECTED:
      return HIRING_STATUS.REJECTED;
    default:
      return HIRING_STATUS.PENDING;
  }
};

const updateHiringStatusService = (collection) => async (req, res) => {
  const { uploadId, type, postId, status } = req.query;
  const statusToFind =
    status === HIRING_STATUS.ACCEPTED
      ? HIRING_STATUS.ACCEPTED
      : HIRING_STATUS.REJECTED;

  const statusToUpdate = getHiringStatus(status);
  const foundCandidate = await collection.findOne({
    status: statusToFind,
    postId,
    userId: uploadId,
    type,
  });

  if (foundCandidate) {
    return res.status(400).json({
      message: `Candidate already been ${statusToFind}`,
    });
  }

  await collection.updateOne(
    { postId, userId: uploadId, type },
    { $set: { status: statusToUpdate, shortlisted: true } }
  );

  return res.status(201).json({
    message: `Candidate status changed to ${status}`,
  });
};

const getHiringStatusDataService = async (collection, match) => {
  const [result = {}] = await collection
    .aggregate([
      { $match: match },
      {
        $lookup: {
          from: "EmployeePostJobs",
          let: { postId: { $toObjectId: "$postId" } },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$postId"] } } }],
          as: "jobDetails",
        },
      },
      { $unwind: "$jobDetails" },
      {
        $facet: {
          data: [
            {
              $group: {
                _id: "$_id",
                userId: { $first: "$userId" },
                status: { $first: "$status" },
                shortlisted: { $first: "$shortlisted" },
                jobDetails: { $first: "$jobDetails" },
              },
            },
          ],
          totalCount: [
            { $count: "count" },
            { $set: { totalCount: "$count" } },
            { $unset: "count" },
          ],
        },
      },
      { $unwind: { path: "$totalCount", preserveNullAndEmptyArrays: true } },
    ])
    .toArray();

  return {
    data: result.data ?? [],
    totalCount: result.totalCount?.totalCount ?? 0,
  };
};

module.exports = { updateHiringStatusService, getHiringStatusDataService };
