import { NextResponse } from "next/server";

// --- NEW Helper Functions ---

// Determine Irrigation Status (Revised Logic)
function getIrrigationStatus(temp: number, humidity: number, windSpeed: number, precipitation: number): { status: string; level: 'info' | 'warning' | 'success' } {
  // Priority 1: Recent Rain
  if (precipitation > 1) { // Significant rain
    return { status: "Recent significant rain. Irrigation likely unnecessary.", level: 'success' };
  }
  if (precipitation > 0.1) { // Light rain
    return { status: "Light recent rain detected. Check soil moisture before irrigating.", level: 'success' };
  }

  // Priority 2: High Evaporation Conditions (No recent rain)
  const isHot = temp > 32;
  const isDry = humidity < 45;
  const isWindy = windSpeed > 5; // Wind speed in m/s

  if (isHot && isDry && isWindy) {
    return { status: "Hot, dry, and windy. High evaporation likely. Monitor soil urgently.", level: 'warning' };
  }
  if (isHot && isDry) {
     return { status: "Hot and dry conditions. Increased evaporation likely. Check soil moisture.", level: 'warning' };
  }
   if (isHot) {
     return { status: "High temperatures detected. Monitor soil moisture closely.", level: 'warning' };
  }
   if (isDry && isWindy) {
     return { status: "Dry and windy. Increased evaporation likely. Check soil moisture.", level: 'warning' };
  }

  // Priority 3: Low Evaporation / Other factors
  if (temp < 10) { 
    return { status: "Cool conditions reduce immediate need. Check soil before irrigating.", level: 'info' };
  }
   if (humidity > 80) { 
    return { status: "High humidity reduces evaporation. Check soil moisture if needed.", level: 'info' };
  }

  // Default: Moderate conditions
  return { status: "Conditions moderate. Monitor soil moisture and irrigate as needed.", level: 'info' };
}

// Generate Crop Growth Advice
function getCropAdvice(temp: number, humidity: number, windSpeed: number, suitableCrops: string[]): string[] {
    const advice: string[] = [];
    if (suitableCrops.length === 0 || suitableCrops[0].includes("Not suitable")) {
        return ["Current conditions are not ideal for the primary listed crops."];
    }
    const cropsStr = suitableCrops.join(', ');

    if (temp > 35) {
        advice.push(`Extreme Heat: High stress likely for ${cropsStr}. Ensure adequate water, consider shade.`);
    }
     else if (temp > 30) {
        advice.push(`High Temperature: Increase watering frequency for ${cropsStr} if soil is dry.`);
    }

    if (humidity > 85) {
        advice.push(`High Humidity: Increases fungal risk for ${cropsStr}. Ensure good air circulation.`);
    }
    
    if (windSpeed > 12) { // Lowered threshold slightly for advice
         advice.push(`Strong Winds: Potential for physical damage or affecting spraying operations for ${cropsStr}.`);
    }

    if (temp < 10) {
        advice.push(`Low Temperatures: Growth may slow for ${cropsStr}. Protect sensitive plants if frost is forecast.`);
    }

    if (advice.length === 0) {
        advice.push(`Current conditions seem generally favorable for ${cropsStr}. Monitor forecasts.`);
    }
    
    return advice.slice(0, 3); // Limit to 3 main advice points
}
// --- End NEW Helper Functions ---

// --- City to State/Crop Mapping (Illustrative) ---
const cityStateCropMap: { [key: string]: { state: string; crops: string[] } } = {
  hyderabad: { state: "Telangana", crops: ["Rice (Paddy)", "Cotton", "Maize", "Sorghum", "Groundnut"] },
  mumbai: { state: "Maharashtra", crops: ["Rice (Coastal)", "Sorghum", "Bajra", "Sugarcane", "Cotton"] },
  chennai: { state: "Tamil Nadu", crops: ["Rice", "Groundnut", "Sugarcane", "Cotton", "Coconut"] },
  kolkata: { state: "West Bengal", crops: ["Rice", "Jute", "Potatoes", "Mustard", "Vegetables"] },
  delhi: { state: "Delhi NCR", crops: ["Wheat", "Mustard", "Vegetables", "Bajra"] },
  lucknow: { state: "Uttar Pradesh", crops: ["Wheat", "Sugarcane", "Rice", "Potatoes", "Mustard"] },
  jaipur: { state: "Rajasthan", crops: ["Bajra", "Mustard", "Wheat", "Pulses", "Groundnut"] },
  shimla: { state: "Himachal Pradesh", crops: ["Apples", "Potatoes", "Maize", "Wheat", "Barley"] },
  bhopal: { state: "Madhya Pradesh", crops: ["Soybean", "Wheat", "Pulses", "Maize", "Cotton"] },
  // Add more cities as needed for better illustration
};

// --- Updated Helper function for Suitable Crops ---
function getSuitableCrops(city: string, temp: number): string[] {
  const lowerCity = city.toLowerCase();
  
  // 1. Check the static map first
  if (cityStateCropMap[lowerCity]) {
    // Optional: Could add temperature check here too for mapped cities
    // e.g., if (temp < 5) return ["Conditions too cold for typical crops in " + cityStateCropMap[lowerCity].state];
    return cityStateCropMap[lowerCity].crops;
  }

  // 2. Fallback to temperature-based logic (Slightly refined)
  if (temp < 5) return ["Conditions too cold for most common crops"];
  if (temp < 15) return ["Wheat", "Barley", "Mustard", "Potatoes", "Carrots"]; // Cooler crops
  if (temp < 25) return ["Maize", "Rice (Paddy)", "Soybean", "Tomatoes", "Beans"]; // Moderate temp crops
  if (temp < 35) return ["Cotton", "Sorghum", "Groundnut", "Millet", "Sugarcane"]; // Warmer crops
  return ["Heat tolerant varieties (e.g., certain Millets, Dates)"]; // Very hot
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city"); // Get city name

    if (!city) { // Check if city is provided
      return NextResponse.json(
        { error: "City name is required" },
        { status: 400 }
      );
    }

    const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

    if (!OPENWEATHER_API_KEY) {
      return NextResponse.json(
        { error: "Weather API key not configured" },
        { status: 500 }
      );
    }

    // Fetch current weather by city name
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    if (!weatherResponse.ok) {
       const errorData = await weatherResponse.json();
       console.error("OpenWeatherMap API Error:", errorData);
       const errorMessage = errorData.message === 'city not found' 
         ? `City not found: ${city}` 
         : "Failed to fetch weather data";
      throw new Error(errorMessage);
    }

    const weatherData = await weatherResponse.json();

    // Extract lat/lon for forecast
    const lat = weatherData.coord.lat;
    const lon = weatherData.coord.lon;

    // Simplified estimated soil temperature (e.g., 2 degrees less than air temp)
    const estimatedSoilTemp = Math.round(weatherData.main.temp - 2);
    
    // Get suitable crops using NEW logic (pass city and temp)
    const suitableCrops = getSuitableCrops(city, weatherData.main.temp);
    
    // --- NEW: Calculate Irrigation Status and Crop Advice (Using updated getIrrigationStatus) ---
    const irrigation = getIrrigationStatus(
        weatherData.main.temp, 
        weatherData.main.humidity,
        weatherData.wind.speed,
        weatherData.rain?.["1h"] || 0
    );
    const advice = getCropAdvice(
        weatherData.main.temp, 
        weatherData.main.humidity, 
        weatherData.wind.speed, 
        suitableCrops
    );
    // --- END NEW ---

    // Get forecast using lat/lon
    const forecastData = await getForecast(lat.toString(), lon.toString(), OPENWEATHER_API_KEY);
    
    // Get alerts (now without soil moisture)
    const weatherAlerts = generateWeatherAlerts(
      weatherData.main.temp,
      weatherData.main.humidity,
      weatherData.wind.speed
    );

    // Process weather data and add agricultural recommendations
    const processedData = {
      location: `${weatherData.name}, ${weatherData.sys.country}`, // Add country
      dt: weatherData.dt, // Include timestamp for date formatting
      weather: {
        temperature: Math.round(weatherData.main.temp), // Round temperature
        feelsLike: Math.round(weatherData.main.feels_like), // Add feels like temp
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        precipitation: weatherData.rain?.["1h"] || 0,
        estimatedSoilTemp: estimatedSoilTemp, // Add estimated soil temp
      },
      suitableCrops: suitableCrops, // Add suitable crops
      irrigationStatus: irrigation, // Use updated irrigation status
      cropAdvice: advice, // Add crop advice
      forecast: forecastData,
      alerts: weatherAlerts, // Keep alerts for potential risks section
    };

    return NextResponse.json(processedData);
  } catch (error: any) { // Type assertion for error
    console.error("Weather API Route Error:", error);
    // Return specific error message if available (like 'City not found')
    return NextResponse.json(
      { error: error.message || "Failed to process weather request" },
      { status: 500 }
    );
  }
}

async function getForecast(lat: string, lon: string, apiKey: string) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenWeatherMap Forecast API Error:", errorData);
      throw new Error("Failed to fetch forecast data");
    }

    const data = await response.json();

    // Process forecast data - simplify for daily overview if needed later
     // For now, keep 3-hour intervals as before
    // Define a type for the forecast list item for clarity
    type ForecastItem = {
        dt: number;
        main: { temp: number };
        weather: [{ description: string; icon: string }];
        rain?: { "3h"?: number };
    };
    return data.list.slice(0, 8).map((item: ForecastItem) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        // minute: '2-digit', // Optional: add minutes
        hour12: true,
      }),
      temperature: Math.round(item.main.temp), // Round temp
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      precipitation: item.rain?.["3h"] || 0,
    }));
  } catch (error) {
    console.error("Forecast Fetch Error:", error);
    return []; // Return empty array on error
  }
}

// Modify alerts function to remove soilMoisture dependency
function generateWeatherAlerts(
  temperature: number,
  humidity: number,
  windSpeed: number
  // soilMoisture is removed
) {
  const alerts = [];

  // Temperature alerts (keep as is)
  if (temperature > 35) {
    alerts.push({
      type: "high_temperature",
      severity: "high",
      message:
        "Extreme heat conditions. Increase irrigation and provide shade for sensitive crops.",
      recommendations: [
        "Water plants early morning or evening",
        "Apply mulch to retain moisture",
        "Monitor for heat stress symptoms",
      ],
    });
  } else if (temperature > 30) {
    alerts.push({
      type: "high_temperature",
      severity: "medium",
      message:
        "High temperature conditions. Consider adjusting irrigation schedule.",
      recommendations: [
        "Maintain regular watering schedule",
        "Check soil before watering", // Adjusted recommendation
        "Protect sensitive crops",
      ],
    });
  }
  
   // Low temperature alerts (added example)
  if (temperature < 5) {
     alerts.push({
      type: "low_temperature",
      severity: "high",
      message:
        "Potential frost conditions. Protect sensitive crops.",
      recommendations: [
        "Cover vulnerable plants",
        "Ensure soil is moist (helps retain heat)",
        "Monitor forecasts closely",
      ],
    });
  }


  // Humidity alerts (keep as is)
  if (humidity > 85) {
    alerts.push({
      type: "high_humidity",
      severity: "high",
      message: "High humidity levels increase risk of fungal diseases.",
      recommendations: [
        "Monitor for disease symptoms",
        "Ensure proper ventilation/spacing", // Adjusted recommendation
        "Consider preventative fungicide application if necessary",
      ],
    });
  }

  // Wind alerts (keep as is)
  if (windSpeed > 15) { // Slightly lowered threshold for alert
    alerts.push({
      type: "high_wind",
      severity: "medium", // Adjusted severity based on threshold
      message: "Strong winds may damage crops and affect spraying operations.",
      recommendations: [
        "Delay pesticide/fertilizer application if possible",
        "Secure row covers or tunnels",
        "Check for physical damage to plants/structures",
      ],
    });
  }
  
  // Remove soil moisture alerts

  return alerts;
}
