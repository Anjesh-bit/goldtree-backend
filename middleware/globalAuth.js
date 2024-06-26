const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { mongoClient } = require("../db/connection");

const database = mongoClient.db("GoldTree");
const collectionEmp = database.collection("AuthEmp");
const collectionSe = database.collection("AuthSeeker");
const dotenv = require("dotenv");

dotenv.config();

const globalAuth = async (req, res, next) => {
  const sendUnauthorizedRes = () => {
    return res.status(401).json({
      message: "You are not authorized",
    });
  };

  const authHeader = req.header("Authorization");
  const authType = req.header("Auth-Type");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    // Verify the token
    const decodedToken = await jwt.verify(
      token,
      process.env.JWT_SECRETE_ACCESS
    );

    const _id = decodedToken.id._id;
    const convertedId = new ObjectId(_id);

    const usersGoldTree =
      authType === "employee"
        ? await collectionEmp.findOne({ _id: convertedId })
        : await collectionSe.findOne({ _id: convertedId });

    if (!usersGoldTree) {
      return sendUnauthorizedRes(); // User not found in database
    }

    req.user = usersGoldTree;
    req.token = token;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
      });
    } else {
      return sendUnauthorizedRes();
    }
  }
};

module.exports = globalAuth;
