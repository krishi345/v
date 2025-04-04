import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received fertilizer request body:", body);

    const { nitrogen, phosphorus, potassium, ph, cropName } = body;

    // --- Input Validation ---
    const values = [nitrogen, phosphorus, potassium, ph];
    if (values.some(val => val === null || val === undefined || val === '') || !cropName) {
         return NextResponse.json(
            { error: "Missing required fields: N, P, K, pH, and Crop Name are required." },
            { status: 400 }
        );
    }
    const numericValues = values.map(parseFloat);
    if (numericValues.some(isNaN)) {
        return NextResponse.json(
            { error: "Invalid input: N, P, K, and pH values must be numbers." },
            { status: 400 }
        );
    }
     const [numN, numP, numK, numPh] = numericValues;
     if (numPh < 0 || numPh > 14) {
       return NextResponse.json(
            { error: "Invalid input: pH value must be between 0 and 14." },
            { status: 400 }
        );
    }
    // --- End Input Validation ---

    // --- Call Gemini API ---
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Gemini API key not configured');
      return NextResponse.json({ error: 'AI API key not configured on server.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Or specify a newer model

    // Construct the prompt
    const prompt = `
      You are an agricultural expert providing fertilizer recommendations.
      Given the following soil test results and the intended crop, provide practical fertilizer advice.

      Soil Nitrogen (N): ${numN} ppm (or kg/ha, assume standard units)
      Soil Phosphorus (P): ${numP} ppm (or kg/ha)
      Soil Potassium (K): ${numK} ppm (or kg/ha)
      Soil pH: ${numPh}
      Intended Crop: ${cropName}

      Based on general nutrient requirements for ${cropName} and the provided soil data:
      1. State whether N, P, and K levels appear Low, Adequate, or High for this crop.
      2. Suggest specific actions to correct deficiencies (e.g., "Increase Nitrogen application").
      3. Recommend common fertilizer types suitable for correcting these deficiencies (e.g., Urea for N, DAP for P, MOP for K). Mention balanced NPK fertilizers if appropriate.
      4. Briefly mention any potential issues related to the pH level for ${cropName}.

      Keep the recommendations concise and practical for a farmer. Format the output as a simple list of suggestions (e.g., using bullet points or numbered list). Do not include greetings or conversational filler.
    `;

    // --- ADDED LOGGING --- 
    console.log("--- Sending Prompt to Gemini ---");
    console.log(prompt);
    console.log("-------------------------------");
    // --- END ADDED LOGGING --- 

    console.log("Calling model.generateContent...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // --- ADDED LOGGING --- 
    console.log("--- Raw Response from Gemini ---");
    console.log(text);
    console.log("-----------------------------");
    // --- END ADDED LOGGING --- 

    // --- Parse Gemini's Response ---
    const suggestions = text.split('\n').map(line => line.trim().replace(/^[*-]\s*/, '')).filter(line => line.length > 0);
    console.log("Parsed Suggestions:", suggestions); // Log parsed suggestions

    return NextResponse.json({ suggestions });

  } catch (error: any) {
    console.error("Error processing fertilizer recommendation request:", error);
     // Check for specific Gemini API errors if possible
    const errorMessage = error.message || "An error occurred while processing your request.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 