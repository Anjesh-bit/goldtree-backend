const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./db/connection");
const userRouter = require("./router/authRoute");
const empDashRouter = require("./router/empDashRoute");
const jobSeekerRouter = require("./router/seekerDashRoute");
const config = require("config");
const cors = require("cors");
const globalAuth = require("./middleware/globalAuth");
const cookieParser = require("cookie-parser");
dotenv.config();

const PORT = config.get("port") || process.env.PORT;

//Initialize the express app
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
connect().catch((e) => {
  console.log(`Error Connecting Db ${e}`);
});
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use("/public", express.static("public"));
app.use("/goldtree", userRouter);
app.use("/goldtree", globalAuth, empDashRouter, jobSeekerRouter);
app.listen(PORT, () => {
  console.log(`GoldTree Is Listening To Port ${PORT}`);
});
