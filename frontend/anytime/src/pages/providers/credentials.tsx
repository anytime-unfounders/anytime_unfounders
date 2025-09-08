import { useState } from "react";
import { useRouter } from "next/router";
import { Upload } from "lucide-react";

export default function ProviderCredentials() {
  const router = useRouter();
  const [certFiles, setCertFiles] = useState<FileList | null>(null);
  const [insuranceFiles, setInsuranceFiles] = useState<FileList | null>(null);
  const [years, setYears] = useState<string>("0-1");

  return (
    <main className="min-h-screen bg-[#F6F8FB] flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-semibold mb-2">Professional Credentials</h1>
        <p className="text-gray-600 mb-6">
          Upload relevant certifications or licenses & proof of insurance (if required).
        </p>

        <div className="bg-white rounded-xl shadow-xl p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <label className="flex flex-col items-center gap-3">
              <div
                className="w-full h-72 md:h-64 lg:h-72 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => {
                  const el = document.getElementById("cert-upload") as HTMLInputElement | null;
                  el?.click();
                }}
              >
                <Upload style={{ transform: "scale(2)" }} className="text-gray-400" />
                <div className="text-sm text-gray-600 mt-4">Certifications / Licenses</div>
                <div className="text-xs text-gray-400 mt-2">PNG, JPG or PDF (multiple allowed)</div>
              </div>
              <input
                id="cert-upload"
                aria-label="certifications"
                type="file"
                multiple
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => setCertFiles(e.target.files)}
              />
              <div className="text-xs text-gray-500">
                {certFiles?.length ? `${certFiles.length} file(s) selected` : "No files selected"}
              </div>
            </label>

            <label className="flex flex-col items-center gap-3">
              <div
                className="w-full h-72 md:h-64 lg:h-72 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => {
                  const el = document.getElementById("insurance-upload") as HTMLInputElement | null;
                  el?.click();
                }}
              >
                <Upload style={{ transform: "scale(2)" }} className="text-gray-400" />
                <div className="text-sm text-gray-600 mt-4">Proof of insurance</div>
                <div className="text-xs text-gray-400 mt-2">PNG, JPG or PDF (multiple allowed)</div>
              </div>
              <input
                id="insurance-upload"
                aria-label="insurance"
                type="file"
                multiple
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => setInsuranceFiles(e.target.files)}
              />
              <div className="text-xs text-gray-500">
                {insuranceFiles?.length ? `${insuranceFiles.length} file(s) selected` : "No files selected"}
              </div>
            </label>

            <div className="flex flex-col justify-center">
              <label className="text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <select
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="border px-3 py-2 rounded w-full"
              >
                <option value="0-1">0–1</option>
                <option value="1-3">1–3</option>
                <option value="3-5">3–5</option>
                <option value="5+">5+</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => router.push("/providers")}
              className="bg-[#8B46F6] hover:bg-[#6C38B8] text-white font-semibold rounded-full px-6 py-2"
            >
              Go!
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}