'use client';

import React, { useState, FormEvent, KeyboardEvent } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Image from 'next/image';

// Updated Interface to match new API response
interface WeatherData {
  location: string; // e.g., "Hyderabad, IN"
  dt?: number; // Add timestamp from API if needed for date display
  weather: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
    precipitation: number;
    estimatedSoilTemp: number;
  };
  suitableCrops: string[];
  irrigationStatus: {
    status: string;
    level: 'info' | 'warning' | 'success';
  };
  cropAdvice: string[];
  forecast: Array<{
    time: string;
    temperature: number;
    description: string;
    icon: string;
    precipitation: number;
  }>;
  alerts: Array<{
    type: string;
    severity: string;
    message: string;
    recommendations: string[];
  }>;
}

// --- Main Page Component ---
const WeatherPage = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (cityName: string) => {
    if (!cityName.trim()) {
        setError("Please enter a city name.");
        setWeatherData(null);
        return;
    }
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch weather data');
      }
      setWeatherData(data as WeatherData);
    } catch (err: any) {
      console.error("Error fetching weather data:", err);
      setError(err.message || 'An error occurred while fetching weather data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      fetchWeatherData(city);
  };
  
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
     if (e.key === 'Enter') {
         fetchWeatherData(city);
     }
  };

  // Helper to format date (assuming dt is available in weatherData)
  const getCurrentDate = () => {
     try {
         // Use current date as fallback if dt isn't in API response
        const timestamp = weatherData?.dt ? weatherData.dt * 1000 : Date.now();
        return new Date(timestamp).toLocaleDateString('en-US', {
             weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
         });
     } catch {
         return "-";
     }
  };

  // --- Main Render --- 
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
            
           {/* Centered Header */}
           <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block">
                    Weather Analysis
                </h1>
                <div className="mt-1 h-1 w-20 bg-primary mx-auto"></div>
           </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10 flex shadow-sm">
            <input 
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter city name (e.g., Hyderabad)"
              className="flex-grow px-4 py-2.5 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button 
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-primary text-white rounded-r-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-colors disabled:opacity-60"
            >
              {loading ? (
                  <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
              ) : (
                  <span>Search</span>
              )}
            </button>
          </form>
          
          {/* Loading State */} 
           {loading && (
              <div className="text-center py-10">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  <p className="mt-2 text-gray-600">Fetching weather data...</p>
              </div>
          )}
          
          {/* Error State */} 
           {error && (
              <div className="text-center py-10 max-w-xl mx-auto bg-red-100 text-red-700 p-4 rounded-md shadow">
                  <p>Error: {error}</p>
              </div>
          )}
          
           {/* Initial State / No Data */} 
            {!loading && !error && !weatherData && (
              <div className="text-center py-10 text-gray-500">
                 <p>Enter a city to see the weather analysis.</p>
              </div>
            )}

          {/* Weather Data Display (Two Columns) */} 
          {weatherData && !loading && !error && (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                 
                 {/* Left Column (Weather + Forecast) */} 
                 <div className="lg:col-span-2 space-y-6">
                     
                     {/* --- Main Weather Card --- */} 
                     <div className="bg-white p-6 rounded-lg shadow-md">
                         <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                            <div>
                                 <h2 className="text-2xl font-bold text-primary mb-0.5">{weatherData.location.split(',')[0]}</h2>
                                 <p className="text-sm text-gray-500 mb-1">{weatherData.location.split(',')[1]?.trim()}</p>
                                 <p className="text-sm text-gray-500">{getCurrentDate()}</p>
                             </div>
                             <div className="text-right mt-2 sm:mt-0">
                                  {/* Main Temp */}
                                 <p className="text-5xl font-bold text-gray-800">{weatherData.weather.temperature}°C</p>
                             </div>
                         </div>
                         
                         <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                             <div className="flex items-center mb-3 sm:mb-0">
                                <Image 
                                    src={`https://openweathermap.org/img/wn/${weatherData.weather.icon}@2x.png`} 
                                    alt={weatherData.weather.description} 
                                    width={64} height={64}
                                    className="-ml-2 mr-2" // Adjust spacing
                                    unoptimized={true}
                                />
                                 <p className="text-lg text-gray-700 capitalize">{weatherData.weather.description}</p>
                            </div>
                            {/* Details Row */}
                             <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600 w-full sm:w-auto">
                                 <span>Humidity: {weatherData.weather.humidity}%</span>
                                 <span>Wind: {weatherData.weather.windSpeed} m/s</span>
                                 <span>Precipitation: {weatherData.weather.precipitation} mm</span>
                                 <span>Est. Soil Temp: {weatherData.weather.estimatedSoilTemp}°C</span>
                             </div>
                         </div>
                     </div>
                     
                     {/* --- Forecast Card --- */} 
                      <div className="bg-white p-6 rounded-lg shadow-md">
                         <h3 className="text-xl font-semibold mb-4 text-gray-700">Hourly Forecast (Next 24 Hours)</h3>
                         <div className="overflow-x-auto">
                             <div className="flex space-x-4">
                                 {weatherData.forecast.map((item, index) => (
                                     <div key={index} className="text-center p-3 border border-gray-200 rounded-md min-w-[110px] bg-gray-50 flex-shrink-0">
                                         <p className="font-semibold text-sm text-gray-800">{item.time}</p>
                                         <Image 
                                             src={`https://openweathermap.org/img/wn/${item.icon}.png`} 
                                             alt={item.description}
                                             width={40} 
                                             height={40}
                                             className="mx-auto my-1"
                                             unoptimized={true}
                                         />
                                         <p className="text-lg font-bold text-gray-900">{item.temperature}°C</p>
                                         <p className="text-xs capitalize text-gray-500 line-clamp-1">{item.description}</p>
                                     </div>
                                 ))}
                             </div>
                         </div>
                     </div>
                     
                 </div>
                 
                 {/* Right Column (Agricultural Impact) */} 
                 <div className="lg:col-span-1">
                     <div className="bg-white rounded-lg shadow-md overflow-hidden">
                         <div className="bg-primary p-3">
                            <h3 className="text-lg font-semibold text-white flex items-center">
                               Agricultural Impact
                           </h3>
                         </div>
                         <div className="p-4 space-y-4">
                            
                             {/* --- Irrigation Status (Dynamic) --- */} 
                             <div>
                                 <h4 className="font-semibold text-gray-700 mb-1.5">Irrigation Status</h4>
                                 {/* Dynamic background based on level */} 
                                 <div className={`p-2 rounded text-sm flex items-center 
                                     ${
                                      weatherData.irrigationStatus.level === 'success' ? 'bg-green-100 text-green-800' : 
                                      weatherData.irrigationStatus.level === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                                      'bg-blue-100 text-blue-800' // Default to info style
                                     }`}>
                                     {/* Example Icons based on level (optional) */} 
                                     {weatherData.irrigationStatus.level === 'success' && <span className="mr-2">✅</span>}
                                     {weatherData.irrigationStatus.level === 'warning' && <span className="mr-2">⚠️</span>}
                                     {weatherData.irrigationStatus.level === 'info' && <span className="mr-2">ℹ️</span>}
                                     <span>{weatherData.irrigationStatus.status}</span>
                                 </div>
                             </div>
                             
                             {/* Potential Risks (from alerts) */} 
                             <div>
                                  <h4 className="font-semibold text-gray-700 mb-1.5">Potential Risks</h4>
                                  <ul className="space-y-1 text-sm text-gray-600">
                                     {weatherData.alerts.filter(a => a.severity === 'high').map((alert, i) => (
                                         <li key={`risk-${i}`} className="flex items-start">
                                             <span className="ml-0">{alert.message.split('.')[0]}</span> 
                                         </li>
                                     ))}
                                     {weatherData.alerts.filter(a => a.severity === 'high').length === 0 && (
                                         <li className="text-gray-500 italic">No high severity risks detected.</li>
                                     )}
                                  </ul>
                             </div>
                             
                             {/* Suitable Crops */}
                              <div>
                                 <h4 className="font-semibold text-gray-700 mb-2">Suitable Crops</h4>
                                  <div className="flex flex-wrap gap-2">
                                      {weatherData.suitableCrops.map((crop, index) => (
                                          <span key={index} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                             {crop}
                                         </span>
                                     ))}
                                     {weatherData.suitableCrops.length === 0 && (
                                         <p className="text-gray-500 italic text-sm">Conditions not ideal for listed crops.</p>
                                     )}
                                  </div>
                             </div>
                             
                             {/* --- Crop Advice (Replaces Recommendations) --- */} 
                              <div>
                                 <h4 className="font-semibold text-gray-700 mb-1.5">Crop Growth Advice</h4>
                                  <ul className="space-y-1.5 text-sm text-gray-600">
                                      {weatherData.cropAdvice.map((advice, i) => (
                                          <li key={`advice-${i}`} className="flex items-start">
                                             {/* Simple bullet point */} 
                                             <span className="mr-2 text-primary">•</span>
                                             <span>{advice}</span>
                                          </li>
                                     ))}
                                      {weatherData.cropAdvice.length === 0 && (
                                          <li className="text-gray-500 italic">No specific advice currently.</li>
                                      )}
                                 </ul>
                             </div>
                             
                              {/* Check Another Location Button (Optional - mimics image) */}
                             {/* 
                             <div className="pt-3 border-t border-gray-200">
                                 <button 
                                     onClick={() => { setWeatherData(null); setCity(''); setError(null); }} 
                                     className="w-full text-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 text-sm font-medium transition-colors"
                                 >
                                     Check Another Location
                                 </button>
                             </div>
                             */}
                         </div>
                     </div>
                 </div>
             </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WeatherPage; 