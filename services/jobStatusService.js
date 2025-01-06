const JOB_STATUS = require("../constant/appConstant");

const jobStatusService = (collection) => async (req, res) => {
  try {
    const { status, userId } = req.query;

    const query = { userId };
    if (status === JOB_STATUS.LIVE) {
      query.status = JOB_STATUS.LIVE;
    } else if (status === JOB_STATUS.CLOSED) {
      query.status = JOB_STATUS.CLOSED;
    }

    const jobs = await collection.find(query).toArray();
    return res.status(200).json(jobs);
  } catch (e) {
    return res
      .status(500)
      .json({ error: `Error while fetching jobs: ${e.message}` });
  }
};

module.exports = jobStatusService;
