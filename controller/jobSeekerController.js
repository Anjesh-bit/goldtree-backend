const { mongoClient } = require("../db/connection");
const database = mongoClient.db("GoldTree");
const upload = database.collection("Upload");
const collectionPosts = database.collection("EmployeePostJobs");
const collectionPfInfo = database.collection("JobSeekerProfileInfo");
const SavedJobInfo = database.collection("SavedJobInfo");
const dotenv = require("dotenv");
const getProfileInfoByUserId = require("../services/profileService");
const { ObjectId } = require("mongodb");
const {
  getHiringStatusDataService,
} = require("../services/hiringStatusService");
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
    //for posting job application
    const { userId, type: applyType, postId } = req.body;

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

    const uploadData = await upload.insertOne({
      ...req.body,
      status: "waiting",
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
    const foundItems = await getHiringStatusDataService(upload, {
      type: "directApply",
      userId,
    });

    res.status(201).json(foundItems);
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database: ${e}` });
  }
};

const uploadProfile = () => {};

const shortListedJobs = async (req, res) => {
  try {
    const { userId } = req.query;
    const foundItems = await getHiringStatusDataService(upload, {
      userId,
      shortlisted: true,
    });

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
    const savedJobs = await getHiringStatusDataService(SavedJobInfo, {
      userId: jobSeekUserId,
    });
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
