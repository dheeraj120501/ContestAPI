import { getHtmlFromUrl, parseHtml, scrapeContests } from "./utils";
import { SimpleIntervalJob, AsyncTask } from "toad-scheduler";
import { updateContest } from "./github_service";

export const initialScrape = async () => {
  try {
    const htmlString = await getHtmlFromUrl("https://clist.by/");
    const parserAPI = parseHtml(htmlString);
    const comingContestsJson = scrapeContests(parserAPI);
    const runningContestsJson = scrapeContests(parserAPI, false);
    Promise.all([
      updateContest("contests/upcoming_contests.json", comingContestsJson),
      updateContest("contests/running_contests.json", runningContestsJson),
    ]);
  } catch (e: any) {
    console.log(e.message);
  }
};

const _scrapeTask = new AsyncTask(
  "simple task",
  () => {
    console.log("Running Task");
    return getHtmlFromUrl("https://clist.by/").then((htmlString) => {
      const parserAPI = parseHtml(htmlString);
      const comingContestsJson = scrapeContests(parserAPI);
      const runningContestsJson = scrapeContests(parserAPI, false);
      Promise.all([
        updateContest("contests/upcoming_contests.json", comingContestsJson),
        updateContest("contests/running_contests.json", runningContestsJson),
      ]);
    });
  },
  (err: Error) => {
    console.log(err.message);
  }
);

export const scheduledScrapeTask = new SimpleIntervalJob(
  { hours: Number(process.env.SCHEDULER_INTERVAL) },
  _scrapeTask
);
