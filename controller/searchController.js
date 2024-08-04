const { mongoClient } = require("../db/connection");
const database = mongoClient.db("GoldTree");
const collectionPosts = database.collection("EmployeePostJobs");

const globalSearch = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: `Query parameter "q" is required` });
    }
    const foundItems = await collectionPosts
      .aggregate([
        {
          $match: {
            $or: [
              {
                job_title: { $regex: q, $options: `i` },
              },
              {
                company_name: { $regex: q, $options: `i` },
              },
            ],
          },
        },
      ])
      .toArray();
    if (foundItems) {
      res.status(201).json(foundItems);
    }
  } catch (e) {
    res.status(500).json({ error: `Error fetching from database : ${e}` });
  }
};

module.exports = { globalSearch };
