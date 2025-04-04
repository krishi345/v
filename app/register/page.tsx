"use client";

import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function CustomerRegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    farmSize: "",
    primaryCrop: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Customer <span className="text-primary">Registration</span>
            </h1>
            <p className="text-lg text-center text-foreground/80 mb-8">
              Register with us to get personalized agricultural recommendations
              and support
            </p>

            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 text-center">
                <svg
                  className="w-16 h-16 mx-auto text-green-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  Registration Successful!
                </h2>
                <p className="text-green-700 mb-4">
                  Thank you for registering with KrishiMitra. We look forward to
                  helping you with your agricultural needs.
                </p>
                <button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="bg-primary text-white font-medium py-2 px-6 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <div className="bg-background border border-primary/20 rounded-xl p-6 md:p-8 shadow-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          pattern="[0-9]{10}"
                          title="Please enter a valid 10-digit phone number"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">
                      Address Information
                    </h2>
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-foreground mb-1"
                      >
                        Street Address
                      </label>
                      <textarea
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          State
                        </label>
                        <select
                          id="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="">Select State</option>
                          <option value="andhra-pradesh">Andhra Pradesh</option>
                          <option value="assam">Assam</option>
                          <option value="bihar">Bihar</option>
                          <option value="chhattisgarh">Chhattisgarh</option>
                          <option value="gujarat">Gujarat</option>
                          <option value="haryana">Haryana</option>
                          <option value="karnataka">Karnataka</option>
                          <option value="kerala">Kerala</option>
                          <option value="madhya-pradesh">Madhya Pradesh</option>
                          <option value="maharashtra">Maharashtra</option>
                          <option value="punjab">Punjab</option>
                          <option value="rajasthan">Rajasthan</option>
                          <option value="tamil-nadu">Tamil Nadu</option>
                          <option value="telangana">Telangana</option>
                          <option value="uttar-pradesh">Uttar Pradesh</option>
                          <option value="west-bengal">West Bengal</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="pincode"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          PIN Code
                        </label>
                        <input
                          type="text"
                          id="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          pattern="[0-9]{6}"
                          title="Please enter a valid 6-digit PIN code"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Farm Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">
                      Farm Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="farmSize"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          Farm Size (in acres)
                        </label>
                        <input
                          type="number"
                          id="farmSize"
                          value={formData.farmSize}
                          onChange={handleInputChange}
                          min="0.1"
                          step="0.1"
                          className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="primaryCrop"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          Primary Crop
                        </label>
                        <select
                          id="primaryCrop"
                          value={formData.primaryCrop}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="">Select Primary Crop</option>
                          <option value="rice">Rice</option>
                          <option value="wheat">Wheat</option>
                          <option value="maize">Maize</option>
                          <option value="cotton">Cotton</option>
                          <option value="sugarcane">Sugarcane</option>
                          <option value="pulses">Pulses</option>
                          <option value="vegetables">Vegetables</option>
                          <option value="fruits">Fruits</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-500 p-4 bg-red-50 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-primary text-white font-medium py-3 px-4 rounded-md hover:bg-primary/90 transition-colors ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Register"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
