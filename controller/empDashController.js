const { mongoClient } = require("../db/connection");
const { ObjectId } = require("mongodb");
const getProfileInfoByUserId = require("../services/profileService");
const database = mongoClient.db("GoldTree");
const collectionPosts = database.collection("EmployeePostJobs");
const collectionPfInfo = database.collection("EmployeeProfileInfo");

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
  } finally {
    await mongoClient.close();
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

    await collectionPfInfo.updateOne({ userId: id }, { $set: updateData });
    const fetchedData = await collectionPfInfo.findOne({ userId: id });

    res.status(201).json(fetchedData);
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database ${e}` });
  }
};

const postJob = async (req, res) => {
  try {
    const id = req.query.id;
    const pipeline = [
      { $match: { userId: id } },
      { $project: { _id: 0, company_name: "$personalInfo.company_name" } },
    ];
    const companyName = await collectionPfInfo.aggregate(pipeline).toArray();

    const postJobs = await collectionPosts.insertOne({
      ...req.body,
      company_name: companyName?.[0]?.company_name,
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

const getPostsByUserId = async (req, res) => {
  try {
    let foundItems = [];
    const { id } = req.params;

    const cursor = collectionPosts.find({ userId: id });

    if (collectionPosts.countDocuments({}) === 0) {
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

const profileInfoById = getProfileInfoByUserId(collectionPfInfo);

const getAllPosts = async (req, res) => {
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
    const { id } = req.params;
    const pipeline = [
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
      res.status(201).json({ ...foundItems, ...companyData[0] });
    }
  } catch (e) {
    res
      .status(500)
      .json({ error: `Error while fetching data from the database: ${e}` });
  }
};

module.exports = {
  profileInfo,
  findAllProfileInfo,
  findOneAndDelete,
  findOneAndUpdate,
  postJob,
  getPostsByUserId,
  profileInfoById,
  getAllPosts,
  findOneAndUpdatePostJobs,
  findByIdAndGet,
};
