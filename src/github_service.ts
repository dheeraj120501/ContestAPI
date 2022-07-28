import axios from "axios";
import { getCurrentTimeStamp } from "./utils";

const _btoa: (data: string, encodeURI?: boolean) => string = (
  data,
  encodeURI = false
) =>
  encodeURI
    ? Buffer.from(encodeURIComponent(data)).toString("base64")
    : Buffer.from(data).toString("base64");

const _atob: (data: string, decodeURI?: boolean) => string = (
  data,
  decodeURI = false
) =>
  decodeURI
    ? decodeURIComponent(Buffer.from(data, "base64").toString())
    : Buffer.from(data, "base64").toString();

/**
 * Takes the file path and content and update the file in the Repo.
 * @param path A string for path of the content to be updated taking the main repo as root
 * @param content The content string, basically the update which is to happen
 */
export const updateContest: (
  path: string,
  content: string
) => Promise<void> = async (path, content) => {
  try {
    const url = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/contents/${path}`;
    const getRes = (await axios({
      method: "get",
      url,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    })) as any;
    const prevData = getRes.data;
    const jsonContent = JSON.stringify({
      "updated-at": getCurrentTimeStamp(),
      content,
    });
    const base64Content = _btoa(jsonContent, true);
    const file = path.split("/").reverse()[0];
    await axios({
      method: "put",
      url,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
      data: {
        message: `updated ${file} on ${getCurrentTimeStamp()}`,
        content: base64Content,
        sha: prevData["sha"],
      },
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const getContest: (path: string) => Promise<Object[]> = async (path) => {
  try {
    const url = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/contents/${path}`;
    const getRes = (await axios({
      method: "get",
      url,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    })) as any;
    const content = getRes.data["content"];
    const result = _atob(
      _btoa(
        content
          .split("\n")
          .map((c: any) => _atob(c))
          .join("")
      ),
      true
    );
    return JSON.parse(result);
  } catch (err: any) {
    console.log(err.message);
  }
};
