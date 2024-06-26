const { mongoClient } = require("../db/connection");

const database = mongoClient.db("GoldTree");
const collection = database.collection("JobSeekerPostJobs");
const upload = database.collection("Upload");
const collectionPosts = database.collection("EmployeePostJobs");
const collectionPfInfo = database.collection("JobSeekerProfileInfo");
const dotenv = require("dotenv");
const getProfileInfoByUserId = require("../services/profileService");
const { ObjectId } = require("mongodb");
dotenv.config();

const profilInfo = async (req, res) => {
  const { userId } = req.body;
  try {
    const profileInfo = await collectionPfInfo.insertOne({
      userId,
      profile: {
        ...req.body.profile,
      },
      experience: {
        ...req.body.experience,
      },
      education: {
        ...req.body.education,
      },
      trainingCert: { ...req.body.trainingCert },
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

const findOneAndUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      profile: {
        ...req.body.profile,
      },
      experience: {
        ...req.body.experience,
      },
      education: {
        ...req.body.education,
      },
      trainingCert: { ...req.body.trainingCert },
    };

    await collectionPfInfo.updateOne({ userId: id }, { $set: updateData });
    const fetchedData = await collectionPfInfo.findOne({ userId: id });

    res.status(201).json(fetchedData);
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database ${e}` });
  }
};

const uploadFile = async (req, res) => {
  try {
    const isShorList = req.query.shortList === "shortlist";

    const { uploadId, type } = req.query;
    const convertedId = new ObjectId(uploadId);
    const filter = {
      _id: convertedId,
      type,
    };
    const foundItems = await upload.findOne(filter);

    const uploadData = isShorList
      ? await upload.updateOne(filter, {
          $set: { ...foundItems, shorlisted: true },
        })
      : await upload.insertOne({
          ...req.body,
          upload_cv: process.env.CLIENT_IMAGE_URI.concat(req.file.filename),
        });

    if (uploadData) {
      const foundItems = await upload.findOne({
        _id: isShorList ? convertedId : uploadData.insertedId,
      });

      if (foundItems?.shorlisted) {
        return res
          .status(409)
          .json({ message: "Candidates have already been shortlisted." });
      }
      res.status(201).json(foundItems);
    }
  } catch (e) {
    res
      .status(500)
      .json({ error: `Error while fetching data from the database: ${e}` });
  }
};

const getAllCandidateEasyApplied = async (req, res) => {
  try {
    upload.createIndex({ postId: 1 });
    collectionPosts.createIndex({ _id: 1 });
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
                      { $eq: [{ $strLenCP: "$$postId" }, 24] }, // Ensure postId length is 24 characters
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
                else: "$$ROOT",
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

const profileInfoById = getProfileInfoByUserId(collectionPfInfo);

const appliedJobsByUserId = async (req, res) => {
  try {
    const { userId } = req.query;

    const foundItems = await upload
      .aggregate([
        {
          $match: {
            type: "directApply",
            userId: userId,
          },
        },
        {
          $lookup: {
            from: "EmployeePostJobs",
            let: { postId: "$postId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: [{ $strLenCP: "$$postId" }, 24] }, // Ensure postId length is 24 characters
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
            as: "postInfo",
          },
        },
        {
          $unwind: "$postInfo",
        },
        {
          $group: {
            _id: "$userId",
            docs: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            _id: 0,
            data: {
              $cond: {
                if: { $gt: [{ $size: "$docs" }, 0] },
                then: "$docs",
                else: null,
              },
            },
          },
        },
      ])
      .toArray();

    res.status(201).json(foundItems);
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database ${e}` });
  }
};

const uploadProfile = () => {};

const shortListedJobs = async (req, res) => {
  try {
    const { userId, type } = req.query;

    const foundItems = await upload
      .aggregate([
        {
          $match: {
            type,
            userId,
          },
        },
        {
          $lookup: {
            from: "EmployeePostJobs",
            let: { postId: "$postId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: [{ $strLenCP: "$$postId" }, 24] }, // Ensure postId length is exactly 24
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
            as: "postInfo",
          },
        },
        {
          $unwind: "$postInfo",
        },
        {
          $group: {
            _id: "$userId",
            data: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ])
      .toArray();

    res.status(201).json(foundItems);
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database ${e}` });
  }
};

const saveJobs = async (req, res) => {
  try {
    const { id, jobSeekUserId } = req.query;
    const convertedId = new ObjectId(id);
    const foundItems = await collectionPosts
      .aggregate([
        {
          $match: {
            _id: convertedId,
          },
        },
      ])
      .toArray();
    const foundOne = await collectionPosts.findOne({ _id: convertedId });
    if (foundOne?.saved) {
      return res.status(409).json({ messsage: "This job is already saved." });
    }
    await collectionPosts.updateOne(
      { _id: convertedId },
      { $set: { ...foundItems[0], saved: true, jobSeekUserId } }
    );
    const updatedFound = await collectionPosts.findOne({ _id: convertedId });
    res.status(201).json(updatedFound);
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database ${e}` });
  }
};

const getsaveJobs = async (req, res) => {
  try {
    const { jobSeekUserId } = req.params;

    const foundItems = await collectionPosts
      .aggregate([
        {
          $match: {
            jobSeekUserId,
            saved: true,
          },
        },
        {
          $group: {
            _id: "$jobSeekUserId",
            data: {
              $push: {
                postInfo: "$$ROOT",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ])
      .toArray();

    if (foundItems) {
      res.status(201).json(foundItems);
    }
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database ${e}` });
  }
};

module.exports = {
  profilInfo,
  uploadFile,
  getAllCandidateEasyApplied,
  profileInfoById,
  findOneAndUpdate,
  appliedJobsByUserId,
  uploadProfile,
  shortListedJobs,
  saveJobs,
  getsaveJobs,
};
