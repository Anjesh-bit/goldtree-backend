const { mongoClient } = require("../db/connection");

const database = mongoClient.db("GoldTree");
const jobSeekerPfInfo = database.collection("JobSeekerProfileInfo");
const employeePfInfo = database.collection("EmployeeProfileInfo");
const dotenv = require("dotenv");
dotenv.config();

const profileUpdate = async (req, res) => {
  try {
    let collection;
    const queryType = req.query.type;
    const query = { userId: req.query.id };
    const uploadData = {
      profile_images: process.env.CLIENT_IMAGE_URI.concat(req.file.filename),
    };

    if (queryType === "jobSeeker") {
      collection = jobSeekerPfInfo;
    } else if (queryType === "employee") {
      collection = employeePfInfo;
    } else {
      return res.status(400).json({ error: "Invalid query type" });
    }

    const matchedData = await collection.findOne({ userId: req.query.id });

    const finalData = { ...matchedData, ...uploadData };
    const updateResult = await collection.updateOne(query, {
      $set: finalData,
    });

    if (updateResult.modifiedCount === 1) {
      const fetchedData = await collection.findOne({ userId: req.query.id });
      res.status(201).json({
        success: true,
        message: "Profile Picture Updated Successfully",
        data: fetchedData,
      });
    } else {
      res.status(404).json({ error: "Data not found or not updated" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ error: `Error while fetching data from the database: ${e}` });
  }
};

module.exports = { profileUpdate };
