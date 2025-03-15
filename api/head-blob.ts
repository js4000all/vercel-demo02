import { head } from "@vercel/blob";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const key = req.query.key as string;
  try {
    console.debug("key:", key);
    const blob = await head(key);
    console.debug("blob:", blob);
    res.status(200).json({ url: blob.url });
  } catch (err: any) {
    console.error("HEAD ERROR:", err);
    res.status(404).json({ error: "Blob not found" });
  }
}
