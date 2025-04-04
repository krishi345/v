'use client';

import { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function FertilizerRecommendationsPage() {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    crop: '',
    growingSeason: '',
    irrigation: ''
  });

  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 2000);
  };

  // Mock fertilizer recommendations based on input
  const getFertilizerRecommendations = () => {
    // This would normally be determined by an AI model
    const recommendations = [
      {
        name: 'NPK 10-26-26',
        dosage: '150 kg/ha',
        timing: 'Apply before planting',
        details: 'Ideal baseline fertilizer with balanced phosphorus and potassium for initial growth.'
      },
      {
        name: 'Urea (46-0-0)',
        dosage: '130 kg/ha',
        timing: 'Apply in 2 split doses: 45 and 75 days after planting',
        details: 'High nitrogen source for vegetative growth. Split application reduces leaching losses.'
      },
      {
        name: 'Micronutrient Mixture',
        dosage: '25 kg/ha',
        timing: 'Apply 30 days after planting',
        details: 'Contains essential trace elements like zinc, boron and manganese for proper plant development.'
      }
    ];
    
    return recommendations;
  };

  // Mock soil health recommendations
  const getSoilHealthRecommendations = () => {
    return [
      'Apply 2 tons of well-decomposed farmyard manure per hectare to improve soil structure',
      'Consider green manuring with Sesbania or Sunhemp before the next cropping season',
      'Maintain soil moisture at optimum levels through proper irrigation scheduling',
      `${formData.ph && parseFloat(formData.ph) > 7.5 ? 'Apply gypsum at 500 kg/ha to reduce soil alkalinity' : 
        formData.ph && parseFloat(formData.ph) < 6.0 ? 'Apply agricultural lime at 400 kg/ha to reduce soil acidity' : 
        'Your soil pH is in the optimal range for most crops'}`
    ];
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Fertilizer <span className="text-primary">Recommendations</span>
            </h1>
            <p className="text-lg text-center text-foreground/80 mb-8">
              Get customized fertilizer recommendations and growth tips based on your soil conditions and selected crops.
            </p>

            {!showResults ? (
              <div className="bg-background border border-primary/20 rounded-xl p-6 md:p-8 shadow-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">Current Soil Nutrient Information</h2>
                    <p className="text-sm text-foreground/70">
                      Enter the NPK (Nitrogen, Phosphorus, Potassium) values from your soil test report. 
                      <Link href="/soil-testing-guide" className="text-primary hover:underline ml-1">
                        How to get soil tested?
                      </Link>
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="nitrogen" className="block text-sm font-medium text-foreground mb-1">
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
                        <label htmlFor="phosphorus" className="block text-sm font-medium text-foreground mb-1">
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
                        <label htmlFor="potassium" className="block text-sm font-medium text-foreground mb-1">
                          Potassium (K) (kg/ha)
                        </label>
                        <input
                          type="number"
                          id="potassium"
                          value={formData.potassium}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="e.g., 60"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ph" className="block text-sm font-medium text-foreground mb-1">
                        Soil pH Level
                      </label>
                      <input
                        type="number"
                        id="ph"
                        value={formData.ph}
                        onChange={handleInputChange}
                        step="0.1"
                        min="0"
                        max="14"
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., 6.5"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">Select Your Crop</h2>
                    <p className="text-sm text-foreground/70">
                      Choose the crop you are growing or planning to grow.
                    </p>
                    
                    <div>
                      <label htmlFor="crop" className="block text-sm font-medium text-foreground mb-1">
                        Crop Type
                      </label>
                      <select
                        id="crop"
                        value={formData.crop}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select crop</option>
                        <option value="rice">Rice</option>
                        <option value="wheat">Wheat</option>
                        <option value="maize">Maize</option>
                        <option value="cotton">Cotton</option>
                        <option value="sugarcane">Sugarcane</option>
                        <option value="potato">Potato</option>
                        <option value="tomato">Tomato</option>
                        <option value="onion">Onion</option>
                        <option value="soybean">Soybean</option>
                        <option value="groundnut">Groundnut</option>
                        <option value="mustard">Mustard</option>
                        <option value="chickpea">Chickpea</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">Growing Conditions</h2>
                    
                    <div>
                      <label htmlFor="growingSeason" className="block text-sm font-medium text-foreground mb-1">
                        Growing Season
                      </label>
                      <select
                        id="growingSeason"
                        value={formData.growingSeason}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select season</option>
                        <option value="kharif">Kharif (Monsoon)</option>
                        <option value="rabi">Rabi (Winter)</option>
                        <option value="zaid">Zaid (Summer)</option>
                        <option value="year-round">Year-round</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="irrigation" className="block text-sm font-medium text-foreground mb-1">
                        Irrigation Method
                      </label>
                      <select
                        id="irrigation"
                        value={formData.irrigation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select irrigation method</option>
                        <option value="drip">Drip Irrigation</option>
                        <option value="sprinkler">Sprinkler</option>
                        <option value="flood">Flood Irrigation</option>
                        <option value="rainfed">Rainfed (No Irrigation)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-primary text-white font-medium py-3 px-4 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing Data...
                        </span>
                      ) : (
                        'Get Fertilizer Recommendations'
                      )}
                    </button>
                    <p className="text-xs text-center text-foreground/60 mt-2">
                      Our AI model will analyze your inputs to provide optimal fertilizer formulations and application schedules.
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-background border border-primary/20 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Fertilizer Recommendations</h2>
                  <button 
                    onClick={() => setShowResults(false)}
                    className="text-primary hover:text-primary/80 font-medium flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    Back to Form
                  </button>
                </div>
                
                <div className="text-sm text-foreground/80 p-4 bg-primary/5 rounded-lg mb-6">
                  <p className="font-medium">Based on your inputs:</p>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div>
                      <span className="font-medium">N:</span> {formData.nitrogen} kg/ha
                    </div>
                    <div>
                      <span className="font-medium">P:</span> {formData.phosphorus} kg/ha
                    </div>
                    <div>
                      <span className="font-medium">K:</span> {formData.potassium} kg/ha
                    </div>
                    <div>
                      <span className="font-medium">pH:</span> {formData.ph}
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Crop:</span> {formData.crop.charAt(0).toUpperCase() + formData.crop.slice(1)}
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Growing Season:</span> {formData.growingSeason.charAt(0).toUpperCase() + formData.growingSeason.slice(1)}
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Recommended Fertilizers</h3>
                  <div className="space-y-4">
                    {getFertilizerRecommendations().map((fertilizer, index) => (
                      <div key={index} className="border border-foreground/10 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                          <h4 className="text-lg font-bold">{fertilizer.name}</h4>
                          <div className="mt-1 md:mt-0 flex flex-wrap gap-2">
                            <span className="inline-block bg-primary/10 rounded-full px-3 py-1 text-sm font-medium text-primary">
                              {fertilizer.dosage}
                            </span>
                            <span className="inline-block bg-foreground/5 rounded-full px-3 py-1 text-sm font-medium">
                              {fertilizer.timing}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-foreground/80">{fertilizer.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Soil Health Recommendations</h3>
                  <ul className="space-y-3 bg-foreground/5 rounded-lg p-4">
                    {getSoilHealthRecommendations().map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-yellow-800 mb-1">Important Note:</p>
                      <p className="text-sm text-yellow-700">
                        These recommendations are based on the information you provided. For best results, consult with a local agricultural expert and adjust based on local conditions and crop variety.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button 
                    onClick={() => window.print()}
                    className="w-full bg-foreground/10 text-foreground font-medium py-3 px-4 rounded-md hover:bg-foreground/20 transition-colors"
                  >
                    Print or Save Results
                  </button>
                </div>
              </div>
            )}

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Benefits of Balanced Fertilization</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-background rounded-lg border border-primary/20 p-5 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="font-bold">Increased Yield</h3>
                  </div>
                  <p className="text-sm text-foreground/80">
                    Balanced fertilization ensures plants receive all necessary nutrients for optimal growth, leading to higher crop yields.
                  </p>
                </div>

                <div className="bg-background rounded-lg border border-primary/20 p-5 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="font-bold">Improved Quality</h3>
                  </div>
                  <p className="text-sm text-foreground/80">
                    Crops grown with proper nutrition develop better taste, appearance, and nutritional content.
                  </p>
                </div>

                <div className="bg-background rounded-lg border border-primary/20 p-5 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold">Cost Effective</h3>
                  </div>
                  <p className="text-sm text-foreground/80">
                    Using the right amount of fertilizer at the right time reduces waste and maximizes your investment.
                  </p>
                </div>

                <div className="bg-background rounded-lg border border-primary/20 p-5 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold">Environmental Benefits</h3>
                  </div>
                  <p className="text-sm text-foreground/80">
                    Precise application reduces runoff and leaching, protecting water resources and surrounding ecosystems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 