// pages/test-api.tsx
import { useState } from "react";

// Removed duplicate default export TestAPI component


// Title component
function SignUpTitle() {
  return (
    <div className="w-full flex justify-center mb-8">
      <h1 className="text-5xl font-bold text-black">Sign Up.</h1>
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
  return (
    <div className="flex flex-col gap-6 w-full max-w-xs mx-auto">
      <button
        className={`bg-[#8B46F6] hover:bg-[#6C38B8] text-white font-semibold rounded-full py-3 hover:cursor-pointer transition-all ${selected === "customer" ? "ring-2 ring-[#8B46F6]" : ""
          }`}
        onClick={() => onSelect("customer")}
      >
        Customer
      </button>
      <button
        className={`bg-[#8B46F6] hover:cursor-pointer hover:bg-[#6C38B8] text-white font-semibold rounded-full py-3 transition-all ${selected === "provider" ? "ring-2 ring-[#8B46F6]" : ""
          }`}
        onClick={() => onSelect("provider")}
      >
        Provider
      </button>
      {selected && (
        <div className="text-center text-[#6C38B8] font-medium mt-2">
          You selected: {selected.charAt(0).toUpperCase() + selected.slice(1)}
        </div>
      )}
    </div>
  );
}

// Customer form component
function CustomerForm({
  form,
  onChange,
  onBack,
  onSubmit,
}: {
  form: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col gap-8">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={onChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 text-center"
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
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 text-center"
              required
            />
          </div>
        </div>
        {/* Phone & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={onChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 text-center"
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
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 text-center"
              required
            />
          </div>
        </div>
        {/* Address Label */}
        <div>
          <span className="font-semibold text-gray-700">Address</span>
        </div>
        {/* Address Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <input
              type="text"
              name="address1"
              placeholder="Address Line #1"
              value={form.address1}
              onChange={onChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 text-center"
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
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 text-center"
            />
          </div>
        </div>
        {/* City & Postal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={onChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 text-center"
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
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 text-center"
              required
            />
          </div>
        </div>
        {/* Province & Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <input
              type="text"
              name="province"
              placeholder="Province/State"
              value={form.province}
              onChange={onChange}
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 text-center"
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
              className="border-0 border-b-2 border-gray-300 focus:border-[#8B46F6] outline-none py-2 text-center"
              required
            />
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={onBack}
            className="text-[#8B46F6] font-semibold px-4 py-2 rounded hover:underline"
          >
            Back
          </button>

          {/* SUBMIT BUTTON */}
          {/* <button
            type="submit"
            className="bg-[#8B46F6] hover:bg-[#6C38B8] text-white font-semibold rounded-full px-8 py-2 transition-all"
          >
            Go!
          </button> */}
          <a
            href="/password"
            className="bg-[#8B46F6] hover:bg-[#6C38B8] text-white font-semibold rounded-full px-8 py-2 transition-all"
          >
            Go!
          </a>
        </div>
      </div>
    </form>
  );
}

export default function SignUp() {
  const [selected, setSelected] = useState<"customer" | "provider" | null>(
    null
  );

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

  // Handle form submit (stub)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // submit logic here
  };

  // Reset selection
  const handleBack = () => setSelected(null);

  return (
    <main className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="w-full flex flex-col items-center justify-center transition-all duration-700">
        <SignUpTitle />
        <div className="w-full flex justify-center">
          <div
            className={`bg-white z-0 rounded-xl shadow-xl p-10 transition-all duration-700 ${selected === "customer" ? "w-3/4 max-w-5xl" : "w-full max-w-xs"
              } min-w-0`}
          >
            {selected === "customer" ? (
              <CustomerForm
                form={form}
                onChange={handleChange}
                onBack={handleBack}
                onSubmit={handleSubmit}
              />
            ) : (
              <UserTypeSelector onSelect={setSelected} selected={selected} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
