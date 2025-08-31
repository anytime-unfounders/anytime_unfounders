// pages/signin.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignIn() {
  // -------------------- local state --------------------
  const [items, setItems] = useState<any[]>([]);     // demo fetch to verify proxy works
  const [email, setEmail] = useState("");            // user email input
  const [password, setPassword] = useState("");      // user password input
  const [error, setError] = useState("");            // UI error banner
  const router = useRouter();                        // client-side navigation

  // -------------------- test fetch on mount --------------------
  useEffect(() => {
    // Call our Next.js proxy: /api/backend/*  --> forwards to Django
    // This proves the proxy is working without touching CORS.
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/backend/api/items/", { method: "GET" });
        if (!res.ok) throw new Error(`Failed items fetch: ${res.status}`);
        const data = await res.json();
        setItems(data);
      } catch (err) {
        // non-fatal: it's just a sanity check
        console.warn("Items fetch failed (ok during early setup):", err);
      }
    };
    fetchItems();
  }, []);

  // -------------------- form submit --------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();      // stop default form navigation
    setError("");            // clear any previous error

    // (Optional) local dev shortcut:
    if (email === "test@gmail.com" && password === "anytime") {
      router.push("/services");
      return;
    }

    try {
      // IMPORTANT: Use the proxy path (no hard-coded Heroku URL)
      // If your Django auth uses session cookies, keep credentials: "include"
      const res = await fetch("/api/backend/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",                         // needed for Django session auth
        body: JSON.stringify({ email, password }),      // request payload to Django
      });

      if (res.ok) {
        // Logged in → go to your app
        router.push("/services");
      } else {
        // Try to surface server-provided message if available
        let msg = "Invalid credentials";
        try {
          const data = await res.json();
          if (data?.detail) msg = String(data.detail);
        } catch { /* ignore parse errors */ }
        setError(msg);
      }
    } catch (err) {
      // Network / proxy errors
      setError("Unable to connect to server. Please try again later.");
      console.error(err);
    }
  };

  // -------------------- UI --------------------
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F8FB]">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md z-10 bg-white/50 rounded-xl shadow-xl p-8 flex flex-col gap-4 border border-gray-200">
        <h2 className="text-2xl font-bold mb-2 text-[#6C38B8] text-center">Sign In</h2>
        <p className="text-gray-600 mb-2 text-center">
          Welcome back! Please sign in to your account.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#8B46F6] w-full text-gray-700"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#8B46F6] w-full text-gray-700"
          />

          <button
            type="submit"
            className="bg-[#6C38B8] hover:bg-[#8B46F6] text-white font-semibold rounded p-2 mt-2 w-full"
          >
            Sign In
          </button>

          {error && <div className="text-red-500 text-center">{error}</div>}
        </form>

        <div className="mt-4 text-center text-gray-600">
          If you don't have an account,&nbsp;
          <Link href="/signup" className="text-[#6C38B8] underline-offset-2 hover:underline font-semibold">
            go to sign up
          </Link>
        </div>

        {/* Debug view: proves proxy fetch works */}
        {items?.length > 0 && (
          <div className="mt-4 text-xs text-gray-500 break-words">
            <div className="font-semibold mb-1">Sample items (proxy OK):</div>
            <pre className="max-h-40 overflow-auto bg-gray-50 p-2 rounded">
              {JSON.stringify(items.slice(0, 3), null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
