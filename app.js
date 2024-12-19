const express = require("express");
const dotenv = require("dotenv");
const { connect, mongoClient } = require("./db/connection");
const userRouter = require("./router/authRoute");
const empDashRouter = require("./router/empDashRoute");
const jobSeekerRouter = require("./router/seekerDashRoute");
const publicRoutes = require("./router/publicRoutes");
const config = require("config");
const cors = require("cors");
const globalAuth = require("./middleware/globalAuth");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const getExpirationDatePost = require("./utils/getExpirationDatePost");
const database = mongoClient.db("GoldTree");
const collectionPosts = database.collection("EmployeePostJobs");
const PAGE_SIZE = 1000;

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
app.use("/goldtree", publicRoutes);
app.use("/goldtree", globalAuth, empDashRouter, jobSeekerRouter);

app.listen(PORT, () => {
  console.log(`GoldTree Is Listening To Port ${PORT}`);
});

cron.schedule("* * * * *", async () => {
  try {
    let hasMoreData = true;
    let skip = 0;

    while (hasMoreData) {
      const jobs = await collectionPosts
        .find({ status: "posted" })
        .skip(skip)
        .limit(PAGE_SIZE)
        .toArray();

      if (jobs.length === 0) {
        hasMoreData = false;
        break;
      }

      const expiredJobs = jobs.filter((job) => {
        const { apply_before: applyBeforeDays } = job;
        const createdAt = job._id.getTimestamp();
        return getExpirationDatePost(applyBeforeDays, createdAt);
      });

      if (expiredJobs.length > 0) {
        const expiredJobIds = expiredJobs.map((job) => job._id);
        await collectionPosts.updateMany(
          { _id: { $in: expiredJobIds } },
          { $set: { status: "closed", updatedAt: new Date() } }
        );
      }

      skip += PAGE_SIZE;
    }
  } catch (error) {
    console.error("Error in cron job execution:", error);
  }
});
