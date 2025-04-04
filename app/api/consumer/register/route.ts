import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return new Response(
          JSON.stringify({
            error: `${
              field.charAt(0).toUpperCase() + field.slice(1)
            } is required`,
          }),
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: "Please enter a valid email address" }),
        { status: 400 }
      );
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.phone)) {
      return new Response(
        JSON.stringify({ error: "Please enter a valid 10-digit phone number" }),
        { status: 400 }
      );
    }

    // Validate PIN code
    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(data.pincode)) {
      return new Response(
        JSON.stringify({ error: "Please enter a valid 6-digit PIN code" }),
        { status: 400 }
      );
    }

    // TODO: Store the consumer data in your database
    // For now, we'll just return a success response
    return new Response(
      JSON.stringify({
        message: "Registration successful",
        data: {
          id: "CONSUMER_" + Math.random().toString(36).substr(2, 9),
          ...data,
          createdAt: new Date().toISOString(),
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in consumer registration:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process registration" }),
      { status: 500 }
    );
  }
}
