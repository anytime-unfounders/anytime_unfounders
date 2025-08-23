import type { NextApiRequest, NextApiResponse } from "next";

let emails: string[] = []; // In-memory, use a database for production!

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (email && typeof email === "string") {
      emails.push(email);
      return res.status(200).json({ success: true });
    }
    return res.status(400).json({ error: "Invalid email" });
  }
  if (req.method === "GET") {
    return res.status(200).json({ emails });
  }
  res.status(405).end();
}
