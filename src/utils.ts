import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Parses a number containing the number of milliseconds and return an object containing nummber of days, hours, minutes and seconds.
 * @param ms Time in milliseconds.
 * @returns Object containing nummber of days, hours, minutes and seconds.
 */
export const dhm: (ms: number) => {
  days: number;
  hrs: number;
  mins: number;
  secs: number;
} = (ms) => {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const days_ms = ms % (24 * 60 * 60 * 1000);
  const hrs = Math.floor(days_ms / (60 * 60 * 1000));
  const hrs_ms = ms % (60 * 60 * 1000);
  const mins = Math.floor(hrs_ms / (60 * 1000));
  const mins_ms = ms % (60 * 1000);
  const secs = Math.floor(mins_ms / 1000);
  return { days, hrs, mins, secs };
};

/**
 *
 * @param url URL of the webpage you want to scrape
 * @returns HTML response in String format
 */
export const getHtmlFromUrl: (url: string) => Promise<string> = async (url) => {
  try {
    const res = await axios.get(url);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return res.data;
  } catch (e: any) {
    console.log(e.message);
  }
};

/**
 *
 * @param htmlString HTML code in string format
 * @returns Parser API that parses the HTML string passed
 */
export const parseHtml = (htmlString: string) => {
  const $ = cheerio.load(htmlString);
  return $;
};

/**
 *
 * @param $ The HTML parser
 * @param contest_status Boolean to tell weather the contest should be running or upcoming i.e. false for running and true for upcoming
 * @returns List of contests according to the status
 */
export const getContests = ($: any, contest_status: boolean = true) => {
  const contestArray = Object.entries(
    $(contest_status ? ".coming" : ".running")
  )
    .reverse()
    .slice(4);
  return JSON.stringify(
    contestArray
      .map((contest: any, idx: number) =>
        JSON.parse(
          (
            (contest[1].children[3] as cheerio.Element)
              .children[3] as cheerio.Element
          ).attribs["data-ace"]
        )
      )
      .filter(
        (contest: any) =>
          dhm(Date.parse(contest.time.start) - Date.now()).days < 8
      ),
    null,
    4
  );
};

/**
 *
 * @returns The current time with date.
 */
export const getCurrentTimeStamp = () => {
  const currentdate = new Date();
  const timeStamp =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return timeStamp;
};
