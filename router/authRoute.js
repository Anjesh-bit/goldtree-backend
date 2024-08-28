const express = require("express");
const {
  login,
  register,
  refreshToken,
  logout,
  changePassword,
} = require("../controller/authController");
const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/register", register);
userRouter.post("/token/:type", refreshToken);
userRouter.post("/change-password", changePassword);
module.exports = userRouter;
