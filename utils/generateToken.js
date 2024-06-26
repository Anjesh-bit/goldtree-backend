const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (id, secrete, exp) => {
  return jwt.sign({ id }, secrete, { expiresIn: exp });
};

const verifyToken = (token, secrete) => {
  return jwt.verify(token, secrete);
};

module.exports = { generateToken, verifyToken };
