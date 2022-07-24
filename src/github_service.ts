import axios from "axios";
import { getCurrentTimeStamp } from "./utils";

/**
 * Takes the file path and content and update the file in the Repo.
 * @param path A string for path of the content to be updated taking the main repo as root
 * @param content The content string, basically the update which is to happen
 */
const updateContent: (path: string, content: string) => Promise<void> = async (
  path,
  content
) => {
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
    const base64Content = Buffer.from(encodeURIComponent(content)).toString(
      "base64"
    );
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

export default updateContent;
