const { mongoClient } = require("../db/connection");
const database = mongoClient.db("GoldTree");
const upload = database.collection("Upload");
const collectionPosts = database.collection("EmployeePostJobs");
const collectionPfInfo = database.collection("JobSeekerProfileInfo");
const ShortListJobInfo = database.collection("ShortListJobInfo");
const SavedJobInfo = database.collection("SavedJobInfo");
const dotenv = require("dotenv");
const getProfileInfoByUserId = require("../services/profileService");
const { ObjectId } = require("mongodb");
dotenv.config();

const profileInfo = async (req, res) => {
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
    const fetchedData = await collectionPfInfo.findOne({ userId: id });
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

    await collectionPfInfo.updateOne(
      { userId: id },
      { $set: updateData },
      { upsert: fetchedData ? false : true, returnDocument: "after" }
    );

    res.status(201).json(fetchedData);
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database ${e}` });
  }
};

const handleJobApplication = async (req, res) => {
  try {
    const isShortList = req.query.shortList === "shortlist";

    //for posting job application
    const { userId, type: applyType, postId } = req.body;

    // for shortlisted candidates
    const { uploadId, type, postId: employeePostId } = req.query;

    const isAlreadyApplied = await upload.findOne({
      userId,
      type: applyType,
      postId,
    });

    if (isAlreadyApplied) {
      return res
        .status(409)
        .json({ error: "You have already posted for this job." });
    }

    if (isShortList) {
      const alreadyShortlisted = await ShortListJobInfo.findOne({
        postId: employeePostId,
        userId: uploadId,
        type,
      });

      if (alreadyShortlisted) {
        return res
          .status(409)
          .json({ message: "Candidate has already been shortlisted." });
      }

      const shortListData = await ShortListJobInfo.insertOne({
        postId: employeePostId,
        userId: uploadId,
        type,
        shortlistedAt: new Date(),
      });

      return res.status(201).json({
        message: "Candidate successfully shortlisted.",
        shortListData,
      });
    }

    const uploadData = await upload.insertOne({
      ...req.body,
      upload_cv: process.env.CLIENT_IMAGE_URI.concat(req.file.filename),
    });

    if (uploadData) {
      const insertedItem = await upload.findOne({ _id: uploadData.insertedId });
      return res.status(201).json(insertedItem);
    }

    res.status(400).json({ error: "Failed to upload the file." });
  } catch (e) {
    res
      .status(500)
      .json({ error: `Error while processing the application: ${e.message}` });
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
              {
                $addFields: {
                  postId: "$$postId",
                },
              },
            ],
            as: "postInfo",
          },
        },
        {
          $unwind: {
            path: "$postInfo",
          },
        },
        {
          $project: {
            _id: 0,
            postId: "$postInfo._id",
            apply_before: "$postInfo.apply_before",
            job_title: "$postInfo.job_title",
            job_level: "$postInfo.job_level",
            job_location: "$postInfo.job_location",
            degree_name: "$postInfo.degree_name",
            education_qual_desc: "$postInfo.education_qual_desc",
            company_name: "$postInfo.company_name",
          },
        },
      ])
      .toArray();

    res.status(201).json(foundItems);
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database: ${e}` });
  }
};

const uploadProfile = () => {};

const shortListedJobs = async (req, res) => {
  try {
    const { userId } = req.query;

    const foundItems = await ShortListJobInfo.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $lookup: {
          from: "EmployeePostJobs",
          let: { postId: { $toObjectId: "$postId" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$postId"] },
              },
            },
          ],
          as: "jobDetails",
        },
      },
      {
        $unwind: "$jobDetails",
      },
      {
        $replaceRoot: { newRoot: "$jobDetails" },
      },
    ]).toArray();

    if (foundItems) {
      res.status(200).json(foundItems);
    } else {
      res.status(200).json([]);
    }
  } catch (e) {
    res.status(500).json({ error: `Error while fetching data: ${e}` });
  }
};

const saveJobs = async (req, res) => {
  try {
    const { id: postId, jobSeekUserId: userId } = req.query;

    const jobExists = await collectionPosts.findOne({
      _id: new ObjectId(postId),
    });

    if (!jobExists) {
      return res.status(404).json({ message: "Job not found." });
    }

    const alreadySaved = await SavedJobInfo.findOne({ postId, userId });
    if (alreadySaved) {
      return res
        .status(409)
        .json({ message: "This job is already saved by the user." });
    }

    await SavedJobInfo.insertOne({
      postId,
      userId,
      savedAt: new Date(),
    });

    res.status(201).json({ message: "Job saved successfully." });
  } catch (e) {
    res.status(500).json({ error: `Error while saving to the database: ${e}` });
  }
};

const getSavedJobs = async (req, res) => {
  try {
    const { jobSeekUserId } = req.params;
    console.log(typeof jobSeekUserId);
    const savedJobs = await SavedJobInfo.aggregate([
      {
        $match: {
          userId: jobSeekUserId,
        },
      },
      {
        $lookup: {
          from: "EmployeePostJobs",
          let: { postId: { $toObjectId: "$postId" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$postId"] },
              },
            },
          ],
          as: "jobDetails",
        },
      },
      {
        $unwind: "$jobDetails",
      },
      {
        $replaceRoot: { newRoot: "$jobDetails" },
      },
    ]).toArray();

    res.status(200).json(savedJobs);
  } catch (e) {
    res.status(500).json({ error: `Error while fetching saved jobs: ${e}` });
  }
};

module.exports = {
  profileInfo,
  handleJobApplication,
  profileInfoById,
  findOneAndUpdate,
  appliedJobsByUserId,
  uploadProfile,
  shortListedJobs,
  saveJobs,
  getSavedJobs,
};
