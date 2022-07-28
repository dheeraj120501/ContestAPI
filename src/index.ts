import "dotenv/config";
import express from "express";
import { ToadScheduler } from "toad-scheduler";
import { getContest } from "./github_service";
import { scheduledScrapeTask } from "./scrapper";

const scheduler = new ToadScheduler();
const app = express();

app.get("/upcoming", async (_, res) => {
  try {
    const result: any = await getContest("contests/upcoming_contests.json");
    res.status(200).json({
      status: "success",
      "updated-at": result["updated-at"],
      data: JSON.parse(result["content"]),
    });
  } catch (err: any) {
    console.log(err.message);
  }
});

app.get("/running", async (_, res) => {
  try {
    const result: any = await getContest("contests/running_contests.json");
    res.status(200).json({
      status: "success",
      "updated-at": result["updated-at"],
      data: JSON.parse(result["content"]),
    });
  } catch (err: any) {
    console.log(err.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log("App Running");
});

scheduler.addSimpleIntervalJob(scheduledScrapeTask);

process.on("exit", function () {
  scheduler.stop();
});
