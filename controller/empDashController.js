const { mongoClient } = require("../db/connection");
const { ObjectId } = require("mongodb");
const getProfileInfoByUserId = require("../services/profileService");
const { JOB_STATUS, HIRING_STATUS } = require("../constant/appConstant");

const jobStatusService = require("../services/jobStatusService");
const {
  updateHiringStatusService,
} = require("../services/hiringStatusService");
const database = mongoClient.db("GoldTree");
const upload = database.collection("Upload");
const collectionPosts = database.collection("EmployeePostJobs");
const collectionPfInfo = database.collection("EmployeeProfileInfo");

collectionPosts.createIndex({ status: 1 });

const profileInfo = async (req, res) => {
  const { userId } = req.body;
  try {
    const profileInfo = await collectionPfInfo.insertOne({
      userId,
      personalInfo: {
        ...req.body.personalInfo,
      },
      socialLink: { ...req.body.socialLink },
      primaryContact: {
        ...req.body.primaryContact,
      },
    });

    if (profileInfo) {
      const foundItems = await collectionPfInfo.findOne({
        _id: profileInfo.insertedId,
      });
      res.status(201).json(foundItems);
    }
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database ${e}` });
  }
};

const findAllProfileInfo = async (req, res) => {
  try {
    let foundItems = [];
    const cursor = collectionPfInfo.find({});
    if (collectionPfInfo.countDocuments({}) === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    for await (const doc of cursor) {
      foundItems.push(doc);
    }
    res.status(201).json(foundItems);
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database ${e}` });
  }
};

const findOneAndDelete = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const deletedData = await collectionPfInfo.deleteOne({
        _id: new ObjectId(id),
      });
      if (deletedData.deletedCount !== 0) {
        res.status(201).json("The data is successfully deleted");
      }
    }
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database ${e}` });
  } finally {
    await mongoClient.close();
  }
};

const findOneAndUpdate = async (req, res) => {
  try {
    const updateData = {
      personalInfo: {
        ...req.body.personalInfo,
      },
      socialLink: {
        ...req.body.socialLink,
      },
      primaryContact: {
        ...req.body.primaryContact,
      },
    };
    const { id } = req.params;
    const fetchedData = await collectionPfInfo.findOne({ userId: id });
    await collectionPfInfo.updateOne(
      { userId: id },
      { $set: updateData },
      { upsert: !fetchedData, returnDocument: "after" }
    );

    res.status(201).json(fetchedData);
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database ${e}` });
  }
};

const postJob = async (req, res) => {
  try {
    const { id } = req.query;
    const pipeline = [
      { $match: { userId: id } },
      { $project: { _id: 0, company_name: "$personalInfo.company_name" } },
    ];
    const companyName = await collectionPfInfo.aggregate(pipeline).toArray();

    const postJobs = await collectionPosts.insertOne({
      ...req.body,
      company_name: companyName?.[0]?.company_name,
      status: JOB_STATUS.LIVE,
    });

    if (postJobs) {
      const postJobsFindOne = await collectionPosts.findOne({
        _id: postJobs.insertedId,
      });
      if (postJobsFindOne) {
        res.status(201).json(postJobsFindOne);
      }
    }
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database ${e}` });
  }
};

const findOneAndUpdatePostJobs = async (req, res) => {
  try {
    const updateData = { ...req.body };
    const { id } = req.params;
    const objId = new ObjectId(id);
    await collectionPosts.updateOne({ _id: objId }, { $set: updateData });
    const fetchedData = await collectionPosts.findOne({
      _id: objId,
    });

    res.status(201).json(fetchedData);
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database ${e}` });
  }
};

const profileInfoById = getProfileInfoByUserId(collectionPfInfo);
const getJobByStatus = jobStatusService(collectionPosts);

const getAllPosts = async (_, res) => {
  try {
    const foundItems = await collectionPosts
      .aggregate([
        {
          $group: {
            _id: "$userId",
            documents: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            _id: 0,
            userId: "$_id",
            posts: "$documents",
          },
        },
      ])
      .toArray();

    if (foundItems.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    return res.status(200).json(foundItems);
  } catch (e) {
    res
      .status(500)
      .json({ error: `Error while fetching data from the database: ${e}` });
  }
};

const findByIdAndGet = async (req, res) => {
  try {
    const { id, userId } = req.query;

    const pipeline = [
      { $match: { userId } },
      {
        $project: {
          _id: 0,
          company_description: "$personalInfo.description",
          company_name: "$personalInfo.company_name",
        },
      },
    ];

    const companyData = await collectionPfInfo.aggregate(pipeline).toArray();

    const foundItems = await collectionPosts.findOne({ _id: new ObjectId(id) });

    if (foundItems) {
      const timestamp = foundItems._id.getTimestamp();

      res.status(201).json({
        ...foundItems,
        ...companyData[0],
        timestamp,
      });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (e) {
    res.status(500).json({
      error: `Error while fetching data from the database: ${e}`,
    });
  }
};

const shortListedCandidates = async (req, res) => {
  const { userId } = req.query;

  try {
    const foundItems = await upload
      .aggregate([
        { $match: { shortlisted: true, status: HIRING_STATUS.PENDING } },
        {
          $lookup: {
            from: "EmployeePostJobs",
            let: { postId: "$postId", jobSeekerId: "$userId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: [
                          "$_id",
                          {
                            $convert: {
                              input: "$$postId",
                              to: "objectId",
                              onError: "$$REMOVE",
                              onNull: "$$REMOVE",
                            },
                          },
                        ],
                      },

                      { $eq: ["$userId", userId] },
                    ],
                  },
                },
              },
            ],
            as: "postInfo",
          },
        },

        {
          $unwind: "$postInfo",
        },

        {
          $lookup: {
            from: "JobSeekerProfileInfo",
            localField: "userId",
            foreignField: "userId",
            as: "profileInfo",
          },
        },

        {
          $unwind: "$profileInfo",
        },

        {
          $project: {
            _id: 0,
            profileInfo: 1,
            postId: "$postInfo._id",
            jobLocation: "$postInfo.job_location",
            companyName: "$postInfo.company_name",
            status: "$status",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                "$profileInfo",
                {
                  postId: "$postId",
                  companyName: "$companyName",
                },
              ],
            },
          },
        },
      ])
      .toArray();

    if (foundItems.length > 0) {
      return res.status(200).json(foundItems);
    } else {
      return res.status(404).json({
        message: "No shortlisted candidates found for this employee.",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: `Error while fetching data from the database: ${e.message}`,
    });
  }
};

const getAllCandidateEasyApplied = async (req, res) => {
  try {
    upload.createIndex({ postId: 1 });
    collectionPosts.createIndex({ _id: 1 });
    const { userId } = req.query;
    const foundItems = await upload
      .aggregate([
        {
          $lookup: {
            from: "EmployeePostJobs",
            let: { postId: "$postId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: [{ $strLenCP: "$$postId" }, 24] },
                      {
                        $eq: [
                          "$_id",
                          {
                            $convert: {
                              input: "$$postId",
                              to: "objectId",
                              onError: "$$REMOVE",
                              onNull: "$$REMOVE",
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            as: "post",
          },
        },
        { $unwind: "$post" },
        {
          $match: {
            "post.userId": userId,
          },
        },
        {
          $lookup: {
            from: "JobSeekerProfileInfo",
            localField: "userId",
            foreignField: "userId",
            as: "jobSeekerProfile",
          },
        },
        {
          $addFields: {
            candidates: {
              $cond: {
                if: { $eq: ["$type", "directApply"] },
                then: {
                  $mergeObjects: [
                    { $arrayElemAt: ["$jobSeekerProfile", 0] },
                    "$$ROOT",
                  ],
                },
                else: {
                  $arrayToObject: {
                    $filter: {
                      input: { $objectToArray: "$$ROOT" },
                      cond: { $ne: ["$$this.k", "jobSeekerProfile"] },
                    },
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            "candidates.experience": 0,
            "candidates.education": 0,
            "candidates.profile": 0,
            "candidates.trainingCert": 0,
          },
        },
        {
          $group: {
            _id: "$post._id",
            post: { $first: "$post" },
            candidates: { $push: "$candidates" },
          },
        },
        {
          $project: {
            _id: 0,
            post: 1,
            candidates: 1,
          },
        },
      ])
      .toArray();

    res.status(201).json(foundItems);
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database ${e}` });
  }
};

const findEmployeeProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const employeeProfile = await collectionPfInfo.findOne({ _id: objectId });

    if (employeeProfile) {
      return res.status(200).json(employeeProfile);
    } else {
      return res.status(404).json({ message: "Employee profile not found" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ error: `Error while fetching from the database: ${e.message}` });
  }
};

const updateHiringStatus = updateHiringStatusService(upload);

module.exports = {
  profileInfo,
  findAllProfileInfo,
  findOneAndDelete,
  findOneAndUpdate,
  postJob,
  getJobByStatus,
  profileInfoById,
  getAllPosts,
  findOneAndUpdatePostJobs,
  findByIdAndGet,
  findEmployeeProfileById,
  shortListedCandidates,
  getAllCandidateEasyApplied,
  updateHiringStatus,
};
