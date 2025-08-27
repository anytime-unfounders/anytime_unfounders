// src/pages/signin.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Test credentials shortcut
    if (email === "test@gmail.com" && password === "anytime") {
      router.push("/services");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      if (res.ok) {
        router.push("/services");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F8FB]">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md z-10 bg-white/50 rounded-xl shadow-xl p-8 flex flex-col gap-4 border border-gray-200">
        <h2 className="text-2xl font-bold mb-2 text-[#6C38B8] text-center">
          Sign In
        </h2>
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
          <Link
            href="/signup"
            className="text-[#6C38B8] underline-offset-2 hover:underline font-semibold"
          >
            go to sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
