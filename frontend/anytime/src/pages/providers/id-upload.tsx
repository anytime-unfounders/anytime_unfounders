import { useState } from "react";
import { useRouter } from "next/router";
import { LucideUpload } from "lucide-react";

export default function ProviderIDUpload() {
  const router = useRouter();
  const [idFiles, setIdFiles] = useState<FileList | null>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIdFiles(e.target.files);
  }

  function handleFinish() {
    // TODO: upload files to backend / call verification API
    // Proceed to selfie step
    router.push("/providers/selfie");
  }

  return (
    <main className="min-h-screen bg-[#F6F8FB] flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-semibold mb-2">Identity Verification</h1>
        <p className="text-gray-600 mb-6">Upload a Government-issued ID.</p>

        <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col gap-6">
          <label className="h-48 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer">
            <div className="text-center text-gray-500">
              <LucideUpload className="scale-200" />
            </div>
            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={onChange}
            />
          </label>

          <div className="text-sm text-gray-600">
            {idFiles?.length
              ? `${idFiles.length} file(s) selected`
              : "No file selected"}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleFinish}
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
