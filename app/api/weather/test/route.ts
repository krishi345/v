import { NextResponse } from "next/server";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export async function GET() {
  try {
    // Test coordinates for Hyderabad
    const lat = "17.3850";
    const lon = "78.4867";

    // Validate API key
    if (!OPENWEATHER_API_KEY) {
      console.error("API key is missing in environment variables");
      return NextResponse.json(
        {
          status: "error",
          message:
            "OpenWeather API key is not configured in environment variables",
        },
        { status: 500 }
      );
    }

    // Test the API key with a simple current weather request
    const testUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;

    console.log("Initiating API test...");

    const response = await fetch(testUrl);
    const data = await response.json();

    if (response.ok) {
      console.log("API test successful:", data);
      return NextResponse.json({
        status: "success",
        message: "API key is working correctly",
        data: {
          city: data.name,
          temp: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        },
      });
    } else {
      console.error("API test failed:", data);
      return NextResponse.json(
        {
          status: "error",
          message: data.message || "API key validation failed",
          code: response.status,
          details: "Please ensure your API key is correct and activated",
        },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Test API error:", error);
    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to test API key",
        details: "An unexpected error occurred while testing the API key",
      },
      { status: 500 }
    );
  }
}
