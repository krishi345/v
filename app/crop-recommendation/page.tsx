"use client";

import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";

// Define the structure of a recommendation object
interface Recommendation {
    name: string;
    confidence: number;
    expectedYield: string;
    profitability: string;
    details: string;
}

export default function CropRecommendationPage() {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    rainfall: "",
  });

  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phError, setPhError] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    // Special validation for pH
    if (id === "ph") {
      const phValue = parseFloat(value);
      if (phValue > 14) {
        setPhError("pH value cannot be greater than 14");
        return;
      } else if (phValue < 0) {
        setPhError("pH value cannot be less than 0");
        return;
      } else {
        setPhError("");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    // Validate pH before submission
    const phValue = parseFloat(formData.ph);
    if (phValue > 14 || phValue < 0) {
      setPhError("pH value must be between 0 and 14");
      return;
    }

    setIsLoading(true);
    setPhError("");
    setError(null);

    try {
      console.log("Sending request to API...");
      const response = await fetch("/api/crop-recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("API Response status:", response.status);
      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const data = await response.json();
      console.log("API Response data:", data);

      if (data.error) {
        throw new Error(data.error);
      }

      console.log("Setting recommendations:", data);
      setRecommendations(data || []);
      setShowResults(true);
    } catch (err: any) {
      console.error("Error in handleSubmit:", err);
      setError(
        err.message || "Failed to get crop recommendations. Please try again."
      );
      setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
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
              Crop <span className="text-primary">Recommendation</span>
            </h1>
            <p className="text-lg text-center text-foreground/80 mb-8">
              Get AI-powered recommendations for the most suitable crops based
              on your soil characteristics and local conditions.
            </p>

            {!showResults ? (
              <div className="bg-background border border-primary/20 rounded-xl p-6 md:p-8 shadow-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">
                      Soil & Weather Information
                    </h2>
                    <p className="text-sm text-foreground/70">
                      Enter your soil test results and local rainfall data to
                      get accurate crop recommendations.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="nitrogen"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          Nitrogen (N) (kg/ha)
                        </label>
                        <input
                          type="number"
                          id="nitrogen"
                          value={formData.nitrogen}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="e.g., 80"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phosphorus"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          Phosphorus (P) (kg/ha)
                        </label>
                        <input
                          type="number"
                          id="phosphorus"
                          value={formData.phosphorus}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="e.g., 40"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="potassium"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          Potassium (K) (kg/ha)
                        </label>
                        <input
                          type="number"
                          id="potassium"
                          value={formData.potassium}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="e.g., 40"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="ph"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          Soil pH
                        </label>
                        <input
                          type="number"
                          id="ph"
                          value={formData.ph}
                          onChange={handleInputChange}
                          step="0.1"
                          className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="e.g., 6.5"
                          required
                        />
                        {phError && (
                          <p className="text-red-500 text-sm mt-1">{phError}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="rainfall"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          Annual Rainfall (mm)
                        </label>
                        <input
                          type="number"
                          id="rainfall"
                          value={formData.rainfall}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="e.g., 1200"
                          required
                        />
                      </div>
                    </div>
                  </div>

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
                        "Get Recommendations"
                      )}
                    </button>
                  </div>

                  <div className="text-sm text-foreground/70 text-center mt-4">
                    <p>
                      Your data will be analyzed using our agricultural database
                      for personalized recommendations
                    </p>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm text-center mt-4">{error}</p>
                  )}
                </form>
              </div>
            ) : (
              <div className="bg-background border border-primary/20 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Recommended Crops
                  </h2>
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setRecommendations([]); // Clear results when going back
                    }}
                    className="text-primary hover:text-primary/80 font-medium flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back to Form
                  </button>
                </div>

                {recommendations.length > 0 ? (
                  <div className="space-y-6">
                    {recommendations.map((rec: Recommendation, index: number) => (
                      <div
                        key={index}
                        className="p-4 border border-foreground/10 rounded-lg bg-foreground/5"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-semibold text-primary">
                              {index + 1}. {rec.name}
                            </h3>
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                rec.profitability === "High"
                                  ? "bg-green-100 text-green-800"
                                  : rec.profitability === "Medium-High"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : rec.profitability === "Medium"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              Profitability: {rec.profitability}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">
                              Confidence: {rec.confidence}%
                            </p>
                            <p className="text-xs text-foreground/70">
                              Yield: ~{rec.expectedYield}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-foreground/80">{rec.details}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-foreground/70">
                    No recommendations available for the given data.
                  </p>
                )}

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 bg-foreground/10 text-foreground font-medium py-2 px-3 rounded-md hover:bg-foreground/20 transition-colors text-sm"
                  >
                    Print Results
                  </button>
                </div>
              </div>
            )}

            {!showResults && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">How It Works</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 rounded-full p-3 mr-4">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Enter Soil Data</h3>
                      <p className="text-foreground/80">
                        Provide NPK values and pH level from your soil test
                        report.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 rounded-full p-3 mr-4">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Add Rainfall Data</h3>
                      <p className="text-foreground/80">
                        Enter your area's annual rainfall to factor in water
                        availability.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 rounded-full p-3 mr-4">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Get Analysis</h3>
                      <p className="text-foreground/80">
                        Our system analyzes soil conditions and water
                        requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 rounded-full p-3 mr-4">
                      <span className="text-primary font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Review Results</h3>
                      <p className="text-foreground/80">
                        Get a ranked list of suitable crops with expected yield
                        and profitability estimates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
