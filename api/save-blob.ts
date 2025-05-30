import { put } from "@vercel/blob";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    const { key, value } = req.body;
    if (!key || typeof value !== "string") {
      return res.status(400).json({ error: "Invalid input" });
    }
    const result = await put(key, value, {
      access: "public",
      addRandomSuffix: false,
      cacheControlMaxAge: 0,
    });
    console.debug("result: ", result);
    return res.status(200).json({ url: result.url });
  } catch (error: any) {
    console.error("[save-todo] Error saving to blob:", error);
    return res
      .status(500)
      .json({ error: "Failed to save", details: error.message });
  }
}
