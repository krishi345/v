"use client";

import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function FertilizerRecommendationPage() {
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [ph, setPh] = useState('');
  const [cropName, setCropName] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async (event: React.FormEvent) => {
     event.preventDefault();
     setLoading(true);
     setError(null);
     setRecommendations([]);

     try {
       const response = await fetch('/api/fertilizer-recommendation', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ nitrogen, phosphorus, potassium, ph, cropName }),
       });

       const data = await response.json();
       if (!response.ok) throw new Error(data.error || 'Failed to get recommendations');
       
       console.log("Received data from backend:", data);
       
       setRecommendations(data.suggestions || []);

     } catch (err: any) {
       setError(err.message || 'An unknown error occurred');
     } finally {
       setLoading(false);
     }
   };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            Fertilizer <span className="text-primary">Recommendations</span>
            </h1>
          <p className="text-center text-gray-600 mb-8">
            Enter your soil test results and intended crop to get AI-powered fertilizer advice.
          </p>

          <form onSubmit={handleGetRecommendations} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                <label htmlFor="nitrogen" className="block text-sm font-medium text-gray-700 mb-1">Nitrogen (N)</label>
                          <input
                            type="number"
                            id="nitrogen"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(e.target.value)}
                  placeholder="e.g., 50"
                            required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                          />
                        </div>
               <div>
                <label htmlFor="phosphorus" className="block text-sm font-medium text-gray-700 mb-1">Phosphorus (P)</label>
                          <input
                            type="number"
                            id="phosphorus"
                  value={phosphorus}
                  onChange={(e) => setPhosphorus(e.target.value)}
                   placeholder="e.g., 25"
                            required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                          />
                        </div>
               <div>
                <label htmlFor="potassium" className="block text-sm font-medium text-gray-700 mb-1">Potassium (K)</label>
                          <input
                            type="number"
                            id="potassium"
                  value={potassium}
                  onChange={(e) => setPotassium(e.target.value)}
                   placeholder="e.g., 40"
                            required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                          />
                        </div>
                    <div>
                <label htmlFor="ph" className="block text-sm font-medium text-gray-700 mb-1">Soil pH</label>
                          <input
                            type="number"
                            id="ph"
                  step="0.1" // Allow decimal for pH
                  value={ph}
                  onChange={(e) => setPh(e.target.value)}
                   placeholder="e.g., 6.5"
                            required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
             <div>
                <label htmlFor="cropName" className="block text-sm font-medium text-gray-700 mb-1">Intended Crop</label>
                <input
                  type="text"
                  id="cropName"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                   placeholder="e.g., Rice, Wheat, Cotton"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
                    </div>

            <div className="pt-2">
                    <button
                      type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
                    </button>
                  </div>
                </form>

          {/* Results Section */} 
          <div className="mt-8">
            {loading && (
              <div className="text-center">
                 <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                 <p className="mt-2 text-gray-600">Generating recommendations...</p>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}
            {!loading && !error && recommendations.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Recommendations:</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
