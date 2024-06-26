const { mongoClient } = require("../db/connection");
const bcrypt = require("bcryptjs");
const { generateToken, verifyToken } = require("../utils/generateToken");

const database = mongoClient.db("GoldTree");
const collectionEmp = database.collection("AuthEmp");
const collectionSe = database.collection("AuthSeeker");
const dotenv = require("dotenv");
const { ObjectId } = require("mongodb");
const getExpiration = require("../utils/expiryDate");
dotenv.config();

const isEmptyFields = (req, res) => {
  const fieldsArray = [];
  Object.keys(req.body).forEach((key) => {
    if (!req.body[key]) {
      fieldsArray.push({ [key]: `This ${key} field is required` });
    }
  });
  return fieldsArray;
};

const login = async (req, res) => {
  try {
    const { email, password, type } = req.body;
    const fieldsArray = isEmptyFields(req, res);
    if (fieldsArray.length > 0) {
      return res
        .status(400)
        .json({ message: "Validation Failed", feilds: fieldsArray });
    }

    const user =
      type === "employee"
        ? await collectionEmp.findOne({ email })
        : await collectionSe.findOne({ email });

    const passw = user && (await bcrypt.compare(password, user.password));
    if (user && passw) {
      const refreshToken = generateToken(
        user._id,
        process.env.JWT_SECRETE_REFRESH,
        "7d"
      );

      const token = generateToken(
        user._id,
        process.env.JWT_SECRETE_ACCESS,
        "1m"
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: getExpiration(7),
        secure: false, // Set to true if using HTTPS
        sameSite: "lax", // Prevents the cookie from being sent in cross-site requests
        path: "/", // Set the path to root '/' or specific path if necessary
      });

      switch (type) {
        case "employee":
          res.status(201).json({
            id: user._id,
            company_name: user.company_name,
            email: user.email,
            mobile_no: user.mobile_no,
            token,
            type: "employee",
          });
          break;
        default:
          res.status(201).json({
            id: user._id,
            first_name: user.first_name,
            middle_name: user.middle_name,
            last_name: user.last_name,
            email: user.email,
            mobile_no: user.mobile_no,
            token,
            type: "jobSeeker",
          });
      }
    } else {
      res.status(409).json({ message: "UserName or Password doesn't Exists!" });
    }
  } catch (e) {
    res.status(400).json({ error: `Error while saving to a database ${e}` });
  }
};

const register = async (req, res) => {
  const {
    company_name,
    email,
    mobile_no,
    password,
    confirm_pass,
    type,
    first_name,
    phone_no,
    middle_name,
    last_name,
  } = req.body;

  try {
    const fieldsArray = isEmptyFields(req, res);
    if (fieldsArray.length > 0) {
      return res
        .status(400)
        .json({ message: "Validation Failed", feilds: fieldsArray });
    }

    const isEmail =
      type === "employee"
        ? await collectionEmp.findOne({ email })
        : await collectionSe.findOne({ email });

    if (isEmail) {
      return res.status(409).json({ message: "User already exists!" });
    }

    if (password !== confirm_pass) {
      return res.status(409).json({ message: "The password didn't match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    if (type === "employee") {
      const data = await collectionEmp.insertOne({
        company_name,
        email,
        phone_no,
        mobile_no,
        password: hashedPass,
        confirm_pass: hashedPass,
      });
      if (data) {
        const foundData = await collectionEmp.findOne({ _id: data.insertedId });
        res.status(201).json(foundData);
      }
    } else {
      const data = await collectionSe.insertOne({
        first_name,
        middle_name,
        last_name,
        email,
        mobile_no,
        password: hashedPass,
        confirm_pass,
      });
      if (data) {
        const foundData = await collectionSe.findOne({ _id: data.insertedId });
        res.status(201).json(foundData);
      }
    }
  } catch (e) {
    res.status(400).json({ error: `Error while saving to a database ${e}` });
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies["refreshToken"];

  const { type } = req.params;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token provided" });

  try {
    const decoded = verifyToken(refreshToken, process.env.JWT_SECRETE_REFRESH);
    const convertedId = new ObjectId(decoded.id);
    const user =
      type === "employee"
        ? await collectionEmp.findOne({ _id: convertedId })
        : await collectionSe.findOne({ _id: convertedId });

    if (!user)
      return res.status(401).json({ message: "Invalid refresh token" });

    const newAccessToken = generateToken(
      user,
      process.env.JWT_SECRETE_ACCESS,
      "1m"
    );
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    path: "/",
    httpOnly: true,
    secure: false, // set to true if using HTTPS
    sameSite: "lax",
  });
  res.json({ message: "Logout successful" });
};

module.exports = { login, register, refreshToken, logout };
