import * as fs from "fs";
import { getHtmlFromUrl, parseHtml, getContests } from "./utils";

(async () => {
  try {
    const htmlString = await getHtmlFromUrl("https://clist.by/");
    const parserAPI = parseHtml(htmlString);
    const comingContestsJson = getContests(parserAPI, ".coming");
    if (!fs.existsSync("./contests")) {
      fs.mkdirSync("./contests");
    }
    fs.writeFileSync("./contests/upcoming_contests.json", comingContestsJson);
    const runningContestsJson = getContests(parserAPI, ".running");
    fs.writeFileSync("./contests/running_contests.json", runningContestsJson);
  } catch (e: any) {
    console.log(e.message);
  }
})();
