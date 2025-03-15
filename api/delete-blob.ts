import { del } from "@vercel/blob";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const key = req.query.key as string;
    await del(key);
    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: "Failed to delete blob" });
  }
}
