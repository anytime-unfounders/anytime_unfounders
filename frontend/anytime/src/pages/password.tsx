import { useState } from "react";

export default function PasswordPage() {
  const [form, setForm] = useState({ password: "", confirm: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle password logic here
  };

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
            className="bg-white/30 z-10 rounded-xl shadow-xl p-10 w-full max-w-md min-w-0 flex flex-col gap-8"
          >
            <div className="text-center font-semibold text-gray-700 text-lg mb-2">
              Enter a strong secure password
            </div>
            <div className="flex flex-col gap-8">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="border-0 border-b-2 border-gray-400 focus:border-[#8B46F6] outline-none py-2 text-center"
                required
              />
              <input
                type="password"
                name="confirm"
                placeholder="Re-Enter Password"
                value={form.confirm}
                onChange={handleChange}
                className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 text-center"
                required
              />
            </div>
            <div className="flex justify-end mt-4">
              {/* <button
                type="submit"
                className="bg-[#8B46F6] hover:bg-[#6C38B8] text-white font-semibold rounded-full px-8 py-2 transition-all"
              >
                Go!
              </button> */}
              <a
                href="/"
                className="bg-[#8B46F6] hover:bg-[#6C38B8] text-white font-semibold rounded-full px-8 py-2 transition-all"
              >
                Go!
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
