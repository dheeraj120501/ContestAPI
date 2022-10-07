import "dotenv/config";
import express from "express";
import { ToadScheduler } from "toad-scheduler";
import { scheduledScrapeTask } from "./scrapper";
import { contests, sheets } from "./routes";
import cors from "cors";
import { getCurrentTimeStamp } from "./utils";

const scheduler = new ToadScheduler();
const app = express();

app.use(cors());

app.use("/contests", contests);

app.use(express.static("public"));

app.get("*", (_, res) => {
  res.send(`App is runnings ${getCurrentTimeStamp()}`);
});

app.listen(process.env.PORT, () => {
  console.log("App Running");
});

scheduler.addSimpleIntervalJob(scheduledScrapeTask);

process.on("exit", function () {
  scheduler.stop();
});
