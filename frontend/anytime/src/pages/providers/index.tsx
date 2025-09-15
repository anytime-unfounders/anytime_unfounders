import { useRouter } from "next/router";

export default function ProvidersIndex() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-[#F6F8FB] flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-xl p-10 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-semibold mb-4">Provider Onboarding Complete</h1>
        <p className="text-gray-600 mb-6">Thank you — your verification steps are complete. You can now manage your services and profile.</p>
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/provider-dashboard")}
            className="bg-[#8B46F6] hover:bg-[#6C38B8] text-white font-semibold rounded-full px-6 py-2"
          >
            Go to Providers
          </button>
        </div>
      </div>
    </main>
  );
}