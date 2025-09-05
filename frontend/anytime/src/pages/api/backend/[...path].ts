// pages/api/backend/[...path].ts
import type { NextApiRequest, NextApiResponse } from "next";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!API_BASE) {
        res.status(500).json({ error: "API base not configured" });
        return;
    }

    const pathParam = req.query.path;
    const path = Array.isArray(pathParam) ? pathParam.join("/") : String(pathParam || "");
    const qs = req.url?.includes("?") ? "?" + req.url.split("?")[1] : "";
    const url = `${API_BASE}/${path}${qs}`;

    // Body handling: Next parses JSON; reconstruct the body for upstream
    const hasBody = !["GET", "HEAD"].includes(req.method || "GET");
    const body = hasBody ? (typeof req.body === "string" ? req.body : JSON.stringify(req.body)) : undefined;

    const headers = new Headers();
    ["authorization", "content-type", "cookie"].forEach((name) => {
        const v = req.headers[name];
        if (typeof v === "string") headers.set(name, v);
    });

    const upstream = await fetch(url, {
        method: req.method,
        headers,
        body,
        redirect: "manual",
    });

    // Copy headers (incl. Set-Cookie)
    upstream.headers.forEach((value, key) => {
        if (key.toLowerCase() === "content-encoding") return;
        if (key.toLowerCase() === "transfer-encoding") return;
        res.setHeader(key, value);
    });

    const buf = Buffer.from(await upstream.arrayBuffer());
    res.status(upstream.status).send(buf);
}
