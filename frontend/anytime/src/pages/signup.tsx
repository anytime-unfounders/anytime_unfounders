// pages/test-api.tsx
import { useState } from "react";
import { useRouter } from "next/router";

// Removed duplicate default export TestAPI component

// Title component
function SignUpTitle() {
  return (
    <div className="w-full flex justify-center mb-2 px-4">
      <h2 className="text-2xl font-bold mb-2 text-[#6C38B8] text-center">
        Sign Up
      </h2>
    </div>
  );
}

// Customer/Provider selection component
function UserTypeSelector({
  onSelect,
  selected,
}: {
  onSelect: (type: "customer" | "provider") => void;
  selected: "customer" | "provider" | null;
}) {
  const router = useRouter();

  const handleProviderClick = () => {
    onSelect("provider"); // Show provider form with animation first
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-xs mx-auto px-4  ">
      <button
        className={`bg-[#8B46F6] hover:bg-[#6C38B8] text-white font-semibold rounded-full py-3 px-4 hover:cursor-pointer transition-all text-sm sm:text-base ${
          selected === "customer" ? "ring-2 ring-[#8B46F6]" : ""
        }`}
        onClick={() => onSelect("customer")}
      >
        Customer
      </button>
      <button
        className={`bg-[#8B46F6] hover:cursor-pointer hover:bg-[#6C38B8] text-white font-semibold rounded-full py-3 px-4 transition-all text-sm sm:text-base ${
          selected === "provider" ? "ring-2 ring-[#8B46F6]" : ""
        }`}
        onClick={handleProviderClick}
      >
        Provider
      </button>
      {selected && (
        <div className="text-center text-[#6C38B8] font-medium mt-2 text-sm sm:text-base">
          You selected: {selected.charAt(0).toUpperCase() + selected.slice(1)}
        </div>
      )}
    </div>
  );
}

// Customer form component
import Link from "next/link";

type CustomerFormType = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  postal: string;
  province: string;
  country: string;
};

function CustomerForm({
  form,
  onChange,
  onBack,
  onSubmit,
}: {
  form: CustomerFormType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="flex flex-col">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={onChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 px-2 text-center text-sm sm:text-base"
              required
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={onChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 px-2 text-center text-sm sm:text-base"
              required
            />
          </div>
        </div>
        {/* Phone & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="flex flex-col">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={onChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 px-2 text-center text-sm sm:text-base"
              required
            />
          </div>
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={onChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 px-2 text-center text-sm sm:text-base"
              required
            />
          </div>
        </div>
        {/* Address Label */}
        <div>
          <span className="font-semibold text-gray-700 text-sm sm:text-base">
            Address
          </span>
        </div>
        {/* Address Lines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="flex flex-col">
            <input
              type="text"
              name="address1"
              placeholder="Address Line #1"
              value={form.address1}
              onChange={onChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 px-2 text-center text-sm sm:text-base"
              required
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="address2"
              placeholder="Address Line #2"
              value={form.address2}
              onChange={onChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 px-2 text-center text-sm sm:text-base"
            />
          </div>
        </div>
        {/* City & Postal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="flex flex-col">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={onChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 px-2 text-center text-sm sm:text-base"
              required
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="postal"
              placeholder="Postal Code"
              value={form.postal}
              onChange={onChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 px-2 text-center text-sm sm:text-base"
              required
            />
          </div>
        </div>
        {/* Province & Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="flex flex-col">
            <input
              type="text"
              name="province"
              placeholder="Province/State"
              value={form.province}
              onChange={onChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 px-2 text-center text-sm sm:text-base"
              required
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={onChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 px-2 text-center text-sm sm:text-base"
              required
            />
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4 sm:gap-0">
          <button
            type="button"
            onClick={onBack}
            className="text-[#8B46F6] font-semibold px-4 py-2 rounded hover:underline text-sm sm:text-base order-2 sm:order-1"
          >
            Back
          </button>

          {/* SUBMIT BUTTON */}
          <Link
            href="/password"
            className="bg-[#8B46F6] hover:bg-[#6C38B8] text-white font-semibold rounded-full px-6 sm:px-8 py-2 transition-all text-sm sm:text-base order-1 sm:order-2 w-full sm:w-auto text-center"
          >
            Go!
          </Link>
        </div>
      </div>
    </form>
  );
}

// Provider form component
function ProviderForm({ onBack }: { onBack: () => void }) {
  const router = useRouter();

  const handleContinueToProviderSignup = () => {
    // navigate to the actual provider signup page
    router.push("/providers/provider-signup");
  };

  return (
    <div className="w-full px-4">
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Welcome Message */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#8B46F6] mb-2 sm:mb-4">
            Join as a Provider
          </h2>
          <p className="text-gray-600 text-base sm:text-lg px-2">
            Ready to offer your services and grow your business with Anytime?
          </p>
        </div>

        {/* Provider Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-purple-50 p-4 sm:p-6 rounded-lg">
            <div className="text-xl sm:text-2xl mb-2 sm:mb-3">💼</div>
            <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
              Grow Your Business
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Connect with customers in your area and expand your client base
            </p>
          </div>

          <div className="bg-purple-50 p-4 sm:p-6 rounded-lg">
            <div className="text-xl sm:text-2xl mb-2 sm:mb-3">💰</div>
            <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
              Flexible Earnings
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Set your own rates and work on your own schedule
            </p>
          </div>

          <div className="bg-purple-50 p-4 sm:p-6 rounded-lg">
            <div className="text-xl sm:text-2xl mb-2 sm:mb-3">📱</div>
            <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
              Easy Management
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Manage bookings, payments, and customer communication in one place
            </p>
          </div>

          <div className="bg-purple-50 p-4 sm:p-6 rounded-lg">
            <div className="text-xl sm:text-2xl mb-2 sm:mb-3">⭐</div>
            <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
              Build Your Reputation
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Collect reviews and ratings to attract more customers
            </p>
          </div>
        </div>

        {/* What You'll Need */}
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">
            What you'll need to get started:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <div className="flex items-center">
              <span className="text-green-500 mr-2 text-sm sm:text-base">
                ✓
              </span>
              <span className="text-gray-700 text-xs sm:text-sm">
                Business information
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2 text-sm sm:text-base">
                ✓
              </span>
              <span className="text-gray-700 text-xs sm:text-sm">
                Contact details
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2 text-sm sm:text-base">
                ✓
              </span>
              <span className="text-gray-700 text-xs sm:text-sm">
                Service category
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2 text-sm sm:text-base">
                ✓
              </span>
              <span className="text-gray-700 text-xs sm:text-sm">
                Business description
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4 sm:gap-0">
          <button
            type="button"
            onClick={onBack}
            className="text-[#8B46F6] font-semibold px-4 py-2 rounded hover:underline text-sm sm:text-base order-2 sm:order-1"
          >
            Back
          </button>

          <button
            onClick={handleContinueToProviderSignup}
            className="bg-[#8B46F6] hover:bg-[#6C38B8] text-white font-semibold rounded-full px-6 sm:px-8 py-2 transition-all text-sm sm:text-base order-1 sm:order-2 w-full sm:w-auto"
          >
            Continue to Provider Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SignUp() {
  const [selected, setSelected] = useState<"customer" | "provider" | null>(
    null
  );

  const router = useRouter(); // moved inside component

  // Form state for customer sign up
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    postal: "",
    province: "",
    country: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (now redirects to users optional-card on success)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call your signup API here. On success, navigate to optional card page:
    router.push("/users/optional-card");
  };

  // Reset selection
  const handleBack = () => setSelected(null);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F6F8FB] p-4 ">
      <div className="w-full flex flex-col items-center justify-center transition-all duration-700 max-w-6xl">
        <div className="w-full flex justify-center">
          <div
            className={`bg-white z-0 rounded-xl shadow-xl p-6 sm:p-8 md:p-10 transition-all duration-700 ${
              selected === "customer" || selected === "provider"
                ? "w-full max-w-5xl"
                : "w-full max-w-sm"
            } min-w-0`}
          >
            {/* moved title inside the rounded white box */}
            <SignUpTitle />

            {selected === "customer" ? (
              <CustomerForm
                form={form}
                onChange={handleChange}
                onBack={handleBack}
                onSubmit={handleSubmit}
              />
            ) : selected === "provider" ? (
              <ProviderForm onBack={handleBack} />
            ) : (
              <UserTypeSelector
                // wrap setSelected so we persist the chosen role for the password page
                onSelect={(type) => {
                  setSelected(type);
                  try {
                    localStorage.setItem("signup_role", type); // "customer" | "provider"
                  } catch (e) {
                    /* ignore storage errors in incognito */
                  }
                }}
                selected={selected}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

