import "dotenv/config";
import { getHtmlFromUrl, parseHtml, getContests } from "./utils";
import { ToadScheduler, SimpleIntervalJob, AsyncTask } from "toad-scheduler";
import updateContent from "./github_service";

const scheduler = new ToadScheduler();

(async () => {
  try {
    const htmlString = await getHtmlFromUrl("https://clist.by/");
    const parserAPI = parseHtml(htmlString);
    const comingContestsJson = getContests(parserAPI);
    const runningContestsJson = getContests(parserAPI, false);
    Promise.all([
      updateContent("contests/upcoming_contests.json", comingContestsJson),
      updateContent("contests/running_contests.json", runningContestsJson),
    ]);
  } catch (e: any) {
    console.log(e.message);
  }
})();

const task = new AsyncTask(
  "simple task",
  () => {
    console.log("Running Task");
    return getHtmlFromUrl("https://clist.by/").then((htmlString) => {
      const parserAPI = parseHtml(htmlString);
      const comingContestsJson = getContests(parserAPI);
      const runningContestsJson = getContests(parserAPI, false);
      Promise.all([
        updateContent("contests/upcoming_contests.json", comingContestsJson),
        updateContent("contests/running_contests.json", runningContestsJson),
      ]);
    });
  },
  (err: Error) => {
    console.log(err.message);
  }
);
const job = new SimpleIntervalJob(
  { hours: Number(process.env.SCHEDULER_INTERVAL) },
  task
);

scheduler.addSimpleIntervalJob(job);

// when stopping your app
process.on("exit", function () {
  scheduler.stop();
});
