const express = require("express");
const {
  login,
  register,
  refreshToken,
  logout,
} = require("../controller/authController");
const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/register", register);
userRouter.post("/token/:type", refreshToken);
module.exports = userRouter;
