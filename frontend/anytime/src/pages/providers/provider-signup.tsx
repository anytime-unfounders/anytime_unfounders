import { useState } from "react";
import { useRouter } from "next/router";

export default function ProviderSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    businessType: "",
    businessDescription: "",
    phone: "",
    address: "",
    website: "",
    profilePhoto: null as File | null,
    coverPhotos: [] as File[],
    videos: [] as File[],
    portfolioPhotos: [] as File[],
    hourlyRate: "",
    minimumCharge: "",
    emergencyRate: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      youtube: "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("socialMedia.")) {
      const socialField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const files = Array.from(e.target.files || []);
    if (fieldName === "profilePhoto") {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: files[0] || null,
      }));
    } else {
      // cast to any to satisfy TS for dynamic field assignment
      setFormData((prev) => ({
        ...prev,
        [fieldName]: files,
      } as any));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // example: client-side minimal validation
      if (!formData.businessName || !formData.email || !formData.businessType) {
        alert("Please fill business name, email and service category.");
        return;
      }

      // persist role so password page can route providers into verification flow
      try {
        localStorage.setItem("signup_role", "provider");
      } catch {
        /* ignore storage errors */
      }

      // TODO: call your provider registration API here (multipart/form-data if uploading files)

      console.log("Provider registration data:", formData);

      // navigate to the password creation step
      router.push("/password");
    } catch (err) {
      console.error("Provider signup failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Join as a Provider</h1>
          <p className="text-gray-600">Start offering your services on Anytime</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
              Business Name *
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Your business name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
              Service Category *
            </label>
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">Select your service category</option>
              <option value="electrician">Electrician</option>
              <option value="plumber">Plumber</option>
              <option value="cleaner">Cleaning Services</option>
              <option value="catering">Catering</option>
              <option value="moving">Moving Services</option>
              <option value="handyman">Handyman</option>
              <option value="landscaping">Landscaping</option>
              <option value="emergency">Emergency Services</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Business Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="123 Main St, City, State, ZIP"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              Website (Optional)
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="https://yourbusiness.com"
            />
          </div>

          <div>
            <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Business Description *
            </label>
            <textarea
              id="businessDescription"
              name="businessDescription"
              value={formData.businessDescription}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              placeholder="Describe your business and services..."
            />
          </div>

          <div>
            <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo *
            </label>
            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "profilePhoto")}
              required
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Upload a professional headshot or business logo</p>
          </div>

          <div>
            <label htmlFor="coverPhotos" className="block text-sm font-medium text-gray-700 mb-2">
              Cover Photos *
            </label>
            <input
              type="file"
              id="coverPhotos"
              name="coverPhotos"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, "coverPhotos")}
              required
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Upload high-quality images showcasing your work</p>
          </div>

          <div>
            <label htmlFor="portfolioPhotos" className="block text-sm font-medium text-gray-700 mb-2">
              Portfolio Photos *
            </label>
            <input
              type="file"
              id="portfolioPhotos"
              name="portfolioPhotos"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, "portfolioPhotos")}
              required
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Upload examples of your previous work and projects</p>
          </div>

          <div>
            <label htmlFor="videos" className="block text-sm font-medium text-gray-700 mb-2">
              Videos (Optional)
            </label>
            <input
              type="file"
              id="videos"
              name="videos"
              accept="video/*"
              multiple
              onChange={(e) => handleFileChange(e, "videos")}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Upload videos showing your work process or completed projects</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Pricing Structure</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-2">
                  Hourly Rate *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    id="hourlyRate"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="50.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="minimumCharge" className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Charge *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    id="minimumCharge"
                    name="minimumCharge"
                    value={formData.minimumCharge}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="100.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="emergencyRate" className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Rate *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    id="emergencyRate"
                    name="emergencyRate"
                    value={formData.emergencyRate}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="75.00"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Social Media (Optional)</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  id="facebook"
                  name="socialMedia.facebook"
                  value={formData.socialMedia.facebook}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="https://facebook.com/yourbusiness"
                />
              </div>

              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                    id="instagram"
                    name="socialMedia.instagram"
                    value={formData.socialMedia.instagram}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="https://instagram.com/yourbusiness"
                  />
                </div>

                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    name="socialMedia.twitter"
                    value={formData.socialMedia.twitter}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="https://twitter.com/yourbusiness"
                  />
                </div>

                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="socialMedia.linkedin"
                    value={formData.socialMedia.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="https://linkedin.com/company/yourbusiness"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="youtube" className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube
                  </label>
                  <input
                    type="url"
                    id="youtube"
                    name="socialMedia.youtube"
                    value={formData.socialMedia.youtube}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="https://youtube.com/c/yourbusiness"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            >
              Create Provider Account
            </button>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => router.push("/signup")}
                className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
              >
                ← Back to signup options
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}