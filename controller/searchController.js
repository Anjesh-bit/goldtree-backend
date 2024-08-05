const { mongoClient } = require("../db/connection");
const { createRegexArray } = require("../utils/createRegexArray");

const database = mongoClient.db("GoldTree");
const collectionPosts = database.collection("EmployeePostJobs");

const globalSearch = async (req, res) => {
  try {
    const { q, vacancyType, careerLevel, gender } = req.query;

    const matchConditions = [
      { job_title: { $regex: new RegExp(q, "i") } },
      { company_name: { $regex: new RegExp(q, "i") } },
    ];

    if (vacancyType) {
      matchConditions.push({
        service_type: { $in: createRegexArray(vacancyType) },
      });
    }

    if (careerLevel) {
      matchConditions.push({
        job_level: { $in: createRegexArray(careerLevel) },
      });
    }

    if (gender) {
      matchConditions.push({
        gender: { $in: createRegexArray(gender) },
      });
    }

    const foundItems = await collectionPosts
      .aggregate([
        {
          $match: {
            $or: matchConditions,
          },
        },
      ])
      .toArray();

    if (foundItems.length > 0) {
      res.status(200).json(foundItems);
    } else {
      res.status(404).json({ message: "No items found" });
    }
  } catch (e) {
    res.status(500).json({ error: `Error fetching from database: ${e}` });
  }
};

module.exports = { globalSearch };
