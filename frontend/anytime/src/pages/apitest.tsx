// pages/test-api.tsx
import { useState } from "react";

export default function TestAPI(): React.JSX.Element {
    const [msg, setMsg] = useState("Click to test");

    async function callHealth() {
        try {
            const res = await fetch("/api/backend/health/", {
                method: "POST",                            // 🔹 use POST
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),                  // 🔹 empty payload
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setMsg(JSON.stringify(data));
        } catch (err: any) {
            setMsg("Error: " + err.message);
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Backend Test</h1>
            <button onClick={callHealth}>Test Health Endpoint</button>
            <p>{msg}</p>
        </div>
    );
}
