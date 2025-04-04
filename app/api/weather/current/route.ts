import { NextResponse } from "next/server";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const city = searchParams.get("city");

    console.log("Received request for:", { lat, lon, city });

    if (!lat || !lon || !city) {
      return NextResponse.json(
        { error: "Latitude, longitude, and city name are required" },
        { status: 400 }
      );
    }

    if (!OPENWEATHER_API_KEY) {
      console.error("OpenWeather API key is missing");
      return NextResponse.json(
        { error: "Weather API key is not configured" },
        { status: 500 }
      );
    }

    // Fetch current weather data
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    if (!currentResponse.ok) {
      const errorData = await currentResponse.json();
      console.error("OpenWeather API Error:", errorData);
      throw new Error(
        errorData.message || "Failed to fetch current weather data"
      );
    }

    const currentData = await currentResponse.json();
    console.log("Current weather data:", currentData);

    // Fetch 5-day forecast data
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    if (!forecastResponse.ok) {
      const errorData = await forecastResponse.json();
      console.error("OpenWeather Forecast API Error:", errorData);
      throw new Error(errorData.message || "Failed to fetch forecast data");
    }

    const forecastData = await forecastResponse.json();
    console.log("Forecast data received");

    // Process forecast data to get daily data (one forecast per day)
    const dailyForecasts = [];
    const seenDates = new Set();

    for (const item of forecastData.list) {
      const date = new Date(item.dt * 1000).toLocaleDateString();

      if (!seenDates.has(date)) {
        seenDates.add(date);
        dailyForecasts.push({
          date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          temp_max: item.main.temp_max,
          temp_min: item.main.temp_min,
          precipitation: item.rain ? item.rain["3h"] || 0 : 0,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed * 3.6, // Convert m/s to km/h
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        });

        if (dailyForecasts.length >= 5) break;
      }
    }

    // Calculate soil temperature (simplified estimation)
    const soilTemp = Math.round(
      (currentData.main.temp + currentData.main.temp_min) / 2
    );

    // Calculate precipitation
    const precipitation = currentData.rain ? currentData.rain["1h"] || 0 : 0;

    // Determine agricultural recommendations based on weather conditions
    const humidity = currentData.main.humidity;
    const temp = currentData.main.temp;
    const windSpeed = currentData.wind.speed * 3.6; // Convert m/s to km/h

    let irrigationStatus = "Suitable for irrigation";
    let risks = [];
    let recommendations = [];

    // Add weather-based recommendations
    if (precipitation > 0) {
      irrigationStatus = "Not suitable for irrigation";
      risks.push("Rainfall may affect dry-field operations");
      recommendations.push("Delay fertilizer application to prevent runoff");
      recommendations.push(
        "Hold off on pesticide application as rain may wash it away"
      );
    }

    if (humidity > 80) {
      risks.push("High humidity may increase disease risk");
      recommendations.push("Monitor crops for fungal diseases");
      recommendations.push("Ensure proper ventilation in greenhouses");
    }

    if (temp > 35) {
      risks.push("High temperature stress on crops");
      recommendations.push("Consider additional irrigation");
      recommendations.push("Apply mulch to retain soil moisture");
    }

    if (windSpeed > 20) {
      risks.push("High wind speeds may damage crops");
      recommendations.push("Consider wind barriers if persistent");
      recommendations.push("Monitor for physical damage to plants");
    }

    // Determine suitable crops based on season and conditions
    const suitableCrops = getSuitableCrops(temp, humidity, precipitation);

    const responseData = {
      location: city,
      temp: currentData.main.temp,
      temp_min: currentData.main.temp_min,
      temp_max: currentData.main.temp_max,
      humidity: currentData.main.humidity,
      description: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
      windSpeed: windSpeed,
      precipitation: precipitation,
      soilTemp: soilTemp,
      forecast: dailyForecasts,
      agricultural: {
        irrigationStatus,
        risks,
        suitableCrops,
        recommendations,
      },
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch weather data",
      },
      { status: 500 }
    );
  }
}

function getSuitableCrops(
  temp: number,
  humidity: number,
  precipitation: number
) {
  const crops = [];

  // Temperature-based recommendations
  if (temp >= 25 && temp <= 35) {
    crops.push("Cotton", "Sugarcane", "Rice");
  }
  if (temp >= 20 && temp <= 30) {
    crops.push("Wheat", "Maize", "Soybean");
  }
  if (temp >= 15 && temp <= 25) {
    crops.push("Potato", "Peas", "Tomato");
  }

  // Humidity-based recommendations
  if (humidity >= 60 && humidity <= 80) {
    crops.push("Mushroom", "Tea", "Coffee");
  }

  // Precipitation-based recommendations
  if (precipitation > 0) {
    crops.push("Rice", "Jute", "Tea");
  } else {
    crops.push("Millet", "Sorghum", "Chickpea");
  }

  // Remove duplicates and return unique crops
  return [...new Set(crops)];
}
