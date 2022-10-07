import express from "express";
import { getContest } from "../github_service";

const router = express.Router();

router.get("/upcoming", async (_, res) => {
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

router.get("/running", async (_, res) => {
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

export default router;
