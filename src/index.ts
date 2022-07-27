import "dotenv/config";
import express from "express";
import { ToadScheduler } from "toad-scheduler";
import { getContest } from "./github_service";
import { scheduledScrapeTask } from "./scrapper";

const scheduler = new ToadScheduler();
const app = express();

app.get("/contests/upcoming", async (_, res) => {
  try {
    const result = await getContest("contests/upcoming_contests.json");
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err: any) {
    console.log(err.message);
  }
});

app.get("/contests/running", async (_, res) => {
  try {
    const result = await getContest("contests/running_contests.json");
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err: any) {
    console.log(err.message);
  }
});

app.listen(process.env.EXPOSED_PORT, () => {
  console.log("App Running");
});

scheduler.addSimpleIntervalJob(scheduledScrapeTask);

process.on("exit", function () {
  scheduler.stop();
});
