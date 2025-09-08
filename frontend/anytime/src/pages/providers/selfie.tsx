import { useRef, useState } from "react";
import { useRouter } from "next/router";

export default function ProviderSelfie() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
  }

  return (
    <main className="min-h-screen bg-[#F6F8FB] flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-semibold mb-2">Identity Verification</h1>
        <p className="text-gray-600 mb-6">Take a selfie to help us verify your ID.</p>

        <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center gap-6">
          {/* selfie UI */}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            onChange={onPick}
          />

          <div className="flex gap-3">
            <button
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2 rounded border"
            >
              Take / Choose Photo
            </button>
            <button
              onClick={() => router.push("/providers/credentials")}
              className="px-6 py-2 rounded bg-[#8B46F6] text-white"
            >
              Go!
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}