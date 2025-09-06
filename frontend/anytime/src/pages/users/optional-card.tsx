import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

export default function OptionalCard() {
  const router = useRouter();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [saving, setSaving] = useState(false);

  function handleSkip() {
    router.replace("/services");
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!cardName || cardNumber.length < 12 || !expiry || cvc.length < 3) {
      alert("Please enter valid card details (demo validation) or skip.");
      return;
    }
    setSaving(true);
    try {
      const safeDemo = { name: cardName, last4: cardNumber.slice(-4), expiry };
      localStorage.setItem("demo_card", JSON.stringify(safeDemo));
    } catch (_) {}
    setTimeout(() => router.replace("/services"), 600);
  }

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center gap-4 mb-4">
          <Image src="/anytimelogo.png" alt="logo" width={48} height={48} />
          <h1 className="text-xl font-bold">Add payment details (optional)</h1>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Provide a credit card now for faster checkout later. This is optional — you can skip and add it later in your account.
        </p>

        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <label className="text-xs font-semibold">Name on card</label>
          <input
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="px-3 py-2 border rounded"
            placeholder="Jane Doe"
          />

          <label className="text-xs font-semibold">Card number</label>
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
            className="px-3 py-2 border rounded"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            maxLength={19}
          />

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs font-semibold">Expiry (MM/YY)</label>
              <input
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="px-3 py-2 border rounded w-full"
                placeholder="12/26"
              />
            </div>
            <div style={{ width: 100 }}>
              <label className="text-xs font-semibold">CVC</label>
              <input
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                className="px-3 py-2 border rounded w-full"
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={handleSkip}
              className="px-4 py-2 rounded border"
              disabled={saving}
            >
              Skip for now
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded bg-[#6C38B8] text-white font-bold"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save and continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
