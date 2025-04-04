import { NextResponse } from "next/server";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const city = searchParams.get("city");

    if (!lat || !lon || !city) {
      return NextResponse.json(
        { error: "Latitude, longitude, and city name are required" },
        { status: 400 }
      );
    }

    if (!OPENWEATHER_API_KEY) {
      return NextResponse.json(
        { error: "Weather API key not configured" },
        { status: 500 }
      );
    }

    // First get current weather
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    if (!currentResponse.ok) {
      throw new Error("Failed to fetch current weather data");
    }

    const currentData = await currentResponse.json();

    // Then get forecast data
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const forecastData = await forecastResponse.json();

    // Process forecast data to get daily forecasts
    const processedForecasts = [];
    const seenDates = new Set();

    // Add current weather as first day
    processedForecasts.push({
      date: currentData.dt,
      temp: currentData.main.temp,
      temp_min: currentData.main.temp_min,
      temp_max: currentData.main.temp_max,
      humidity: currentData.main.humidity,
      description: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
      windSpeed: currentData.wind.speed * 3.6, // Convert m/s to km/h
      feelsLike: currentData.main.feels_like,
      rain_chance: 0, // Current weather doesn't have precipitation probability
    });
    seenDates.add(new Date(currentData.dt * 1000).toDateString());

    // Process remaining forecast days
    for (const item of forecastData.list) {
      const itemDate = new Date(item.dt * 1000).toDateString();
      if (!seenDates.has(itemDate) && processedForecasts.length < 5) {
        processedForecasts.push({
          date: item.dt,
          temp: item.main.temp,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          humidity: item.main.humidity,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          windSpeed: item.wind.speed * 3.6,
          feelsLike: item.main.feels_like,
          rain_chance: item.pop ? Math.round(item.pop * 100) : 0,
        });
        seenDates.add(itemDate);
      }
    }

    return NextResponse.json({
      location: city,
      forecast: processedForecasts,
    });
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
