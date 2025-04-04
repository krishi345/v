import { NextResponse } from "next/server";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Latitude and longitude are required" },
        { status: 400 }
      );
    }

    if (!OPENWEATHER_API_KEY) {
      return NextResponse.json(
        { error: "Weather API key not configured" },
        { status: 500 }
      );
    }

    // Get location name from coordinates
    const locationResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${OPENWEATHER_API_KEY}`
    );
    const locationData = await locationResponse.json();
    const location = locationData[0]?.name
      ? `${locationData[0].name}, ${locationData[0].country}`
      : "Location unknown";

    // Get 7-day forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const forecastData = await forecastResponse.json();

    // Process and format forecast data
    const forecast = forecastData.list.map((day: any) => ({
      date: new Date(day.dt * 1000).toISOString(),
      temp_max: day.temp.max,
      temp_min: day.temp.min,
      description: day.weather[0].description,
      icon: day.weather[0].icon,
      rain_chance: Math.round(day.pop * 100), // Probability of precipitation
    }));

    return NextResponse.json({
      location,
      forecast,
    });
  } catch (error) {
    console.error("Weather forecast error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather forecast" },
      { status: 500 }
    );
  }
}
