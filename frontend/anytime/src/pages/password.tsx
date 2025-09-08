import { useRouter } from "next/router";
import { useState } from "react";

export default function PasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // basic client-side validation
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      // TODO: call your signup/password API here to persist the password
      // Demo delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // On success, route based on selected role saved during signup
      let role: string | null = null;
      try {
        role = localStorage.getItem("signup_role");
      } catch (e) {
        /* ignore storage errors */
      }

      if (role === "provider") {
        // send providers into verification flow
        router.push("/providers/id-upload");
      } else {
        // default: customer flow (optional card)
        router.push("/users/optional-card");
      }

      // cleanup temporary value
      try {
        localStorage.removeItem("signup_role");
      } catch {}
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Left: Title */}
        <div className="flex-1 flex items-center justify-center md:justify-end w-full">
          <h1 className="text-5xl font-bold text-black">Password</h1>
        </div>
        {/* Right: Form Card */}
        <div className="flex-1 flex items-center justify-center w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-white/30 z-10 rounded-xl shadow-xl p-10 w-full max-w-md min-w-0 flex flex-col gap-6"
          >
            <div className="text-center font-semibold text-gray-700 text-lg mb-2">
              Enter a strong secure password
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="border-0 border-b-2 border-gray-400 focus:border-[#8B46F6] outline-none py-2 text-center"
                required
                minLength={8}
                disabled={submitting}
              />
              <input
                type="password"
                name="confirm"
                placeholder="Re-Enter Password"
                value={form.confirm}
                onChange={handleChange}
                className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 text-center"
                required
                disabled={submitting}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 text-center">{error}</div>
            )}

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-[#8B46F6] hover:bg-[#6C38B8] text-white font-semibold rounded-full px-8 py-2 transition-all disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Go!"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
