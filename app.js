const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./db/connection");
const userRouter = require("./router/authRoute");
const empDashRouter = require("./router/empDashRoute");
const jobSeekerRouter = require("./router/seekerDashRoute");
const publicRoutes = require("./router/publicRoutes");
const config = require("config");
const cors = require("cors");
const globalAuth = require("./middleware/globalAuth");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const scheduleJobStatus = require("./services/scheduleJobStatus");
const adminRouter = require("./router/adminRoute");

dotenv.config();

const PORT = config.get("port") || process.env.PORT;

//Initialize the express app
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://api.goldtree.com.np"],
    credentials: true,
  })
);

connect().catch((e) => {
  console.log(`Error Connecting Db ${e}`);
});
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use("/public", express.static("public"));
app.use("/goldtree", userRouter);
app.use("/goldtree", publicRoutes);
app.use("/goldtree", globalAuth, empDashRouter, jobSeekerRouter);
app.use("/api/v1/gold-tree-admin", adminRouter);
app.listen(PORT, () => {
  console.log(`GoldTree Is Listening To Port ${PORT}`);
});

cron.schedule("0 0 * * *", scheduleJobStatus);
