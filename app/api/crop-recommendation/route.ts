import { NextResponse } from "next/server";

// Define crop requirements and characteristics
const cropData = {
  rice: {
    name: "Rice",
    requirements: {
      nitrogen: { min: 60, max: 120 },
      phosphorus: { min: 30, max: 60 },
      potassium: { min: 30, max: 60 },
      ph: { min: 5.5, max: 7.5 },
    },
    yield: { min: 3.5, max: 6.5 },
    states: [
      "andhra-pradesh",
      "telangana",
      "tamil-nadu",
      "kerala",
      "karnataka",
      "punjab",
      "haryana",
      "bihar",
      "west-bengal",
    ],
    season: ["kharif", "rabi"],
    waterRequirement: "High",
    investmentPerAcre: 25000,
  },
  wheat: {
    name: "Wheat",
    requirements: {
      nitrogen: { min: 100, max: 150 },
      phosphorus: { min: 50, max: 80 },
      potassium: { min: 40, max: 70 },
      ph: { min: 6.0, max: 7.5 },
    },
    yield: { min: 3.0, max: 5.5 },
    states: [
      "punjab",
      "haryana",
      "uttar-pradesh",
      "madhya-pradesh",
      "rajasthan",
      "bihar",
    ],
    season: ["rabi"],
    waterRequirement: "Medium",
    investmentPerAcre: 20000,
  },
  cotton: {
    name: "Cotton",
    requirements: {
      nitrogen: { min: 80, max: 120 },
      phosphorus: { min: 40, max: 60 },
      potassium: { min: 40, max: 80 },
      ph: { min: 6.0, max: 8.0 },
    },
    yield: { min: 1.5, max: 2.5 },
    states: [
      "gujarat",
      "maharashtra",
      "telangana",
      "andhra-pradesh",
      "punjab",
      "haryana",
    ],
    season: ["kharif"],
    waterRequirement: "Medium",
    investmentPerAcre: 35000,
  },
  sugarcane: {
    name: "Sugarcane",
    requirements: {
      nitrogen: { min: 150, max: 200 },
      phosphorus: { min: 60, max: 100 },
      potassium: { min: 50, max: 90 },
      ph: { min: 6.0, max: 7.5 },
    },
    yield: { min: 60, max: 100 },
    states: [
      "uttar-pradesh",
      "maharashtra",
      "karnataka",
      "tamil-nadu",
      "bihar",
    ],
    season: ["spring", "autumn"],
    waterRequirement: "Very High",
    investmentPerAcre: 45000,
  },
  maize: {
    name: "Maize",
    requirements: {
      nitrogen: { min: 120, max: 160 },
      phosphorus: { min: 50, max: 80 },
      potassium: { min: 40, max: 80 },
      ph: { min: 5.5, max: 7.5 },
    },
    yield: { min: 4.0, max: 8.0 },
    states: [
      "karnataka",
      "andhra-pradesh",
      "telangana",
      "rajasthan",
      "madhya-pradesh",
    ],
    season: ["kharif", "rabi"],
    waterRequirement: "Medium",
    investmentPerAcre: 22000,
  },
};

function calculateCropScore(soil: any, crop: any) {
  let score = 0;
  const maxScore = 100;

  // Calculate nutrient scores
  const nScore = calculateNutrientScore(
    parseFloat(soil.nitrogen),
    crop.requirements.nitrogen
  );
  const pScore = calculateNutrientScore(
    parseFloat(soil.phosphorus),
    crop.requirements.phosphorus
  );
  const kScore = calculateNutrientScore(
    parseFloat(soil.potassium),
    crop.requirements.potassium
  );
  const phScore = calculatePhScore(parseFloat(soil.ph), crop.requirements.ph);

  // Calculate rainfall score based on water requirement
  const rainfallScore = calculateRainfallScore(
    parseFloat(soil.rainfall),
    crop.waterRequirement
  );

  // Weight the scores (adjust weights based on importance)
  score =
    (nScore * 0.2 +
      pScore * 0.2 +
      kScore * 0.2 +
      phScore * 0.2 +
      rainfallScore * 0.2) *
    maxScore;

  return Math.round(score);
}

function calculateNutrientScore(
  value: number,
  requirement: { min: number; max: number }
) {
  if (isNaN(value)) return 0;
  if (value < requirement.min) return value / requirement.min;
  if (value > requirement.max) return requirement.max / value;
  return 1;
}

function calculatePhScore(
  ph: number,
  requirement: { min: number; max: number }
) {
  if (isNaN(ph)) return 0;
  if (ph < requirement.min || ph > requirement.max) {
    const midPoint = (requirement.min + requirement.max) / 2;
    const distance = Math.abs(ph - midPoint);
    const maxDistance = Math.max(
      Math.abs(requirement.max - midPoint),
      Math.abs(requirement.min - midPoint)
    );
    return Math.max(0, 1 - distance / maxDistance);
  }
  return 1;
}

function calculateRainfallScore(rainfall: number, waterRequirement: string) {
  if (isNaN(rainfall)) return 0;

  // Define rainfall requirements for different water requirement levels (mm/year)
  type WaterRequirementLevel = "Very High" | "High" | "Medium" | "Low";
  const requirements: Record<WaterRequirementLevel, { min: number; optimal: number; max: number }> = {
    "Very High": { min: 1500, optimal: 2000, max: 3000 },
    High: { min: 1000, optimal: 1500, max: 2000 },
    Medium: { min: 700, optimal: 1000, max: 1500 },
    Low: { min: 350, optimal: 700, max: 1000 },
  };

  // Ensure waterRequirement is a valid key or default to Medium
  const validWaterRequirement = (requirements.hasOwnProperty(waterRequirement) ? waterRequirement : "Medium") as WaterRequirementLevel;
  const req = requirements[validWaterRequirement];

  if (rainfall < req.min) return rainfall / req.min;
  if (rainfall > req.max) return req.max / rainfall;
  if (rainfall <= req.optimal) return rainfall / req.optimal;
  return req.optimal / rainfall;
}

function generateRecommendationDetails(crop: any, score: number, soil: any) {
  let details = `${crop.name} is `;

  if (score >= 80) {
    details += "highly suitable for your soil conditions. ";
  } else if (score >= 60) {
    details += "moderately suitable for your soil conditions. ";
  } else {
    details += "marginally suitable but can be grown with proper management. ";
  }

  // Add nutrient-specific advice
  const n = parseFloat(soil.nitrogen);
  const p = parseFloat(soil.phosphorus);
  const k = parseFloat(soil.potassium);

  if (n < crop.requirements.nitrogen.min) {
    details += "Consider increasing nitrogen application. ";
  }
  if (p < crop.requirements.phosphorus.min) {
    details += "Phosphorus supplementation recommended. ";
  }
  if (k < crop.requirements.potassium.min) {
    details += "Additional potassium may be needed. ";
  }

  details += `Water requirement is ${crop.waterRequirement.toLowerCase()}. `;
  details += `Typical investment needed is ₹${crop.investmentPerAcre.toLocaleString()} per acre.`;

  return details;
}

function calculateExpectedYield(crop: any, score: number) {
  const yieldRange = crop.yield.max - crop.yield.min;
  const expectedYield = crop.yield.min + yieldRange * (score / 100);
  return expectedYield.toFixed(1);
}

function getProfitabilityRating(score: number) {
  if (score >= 80) return "High";
  if (score >= 70) return "Medium-High";
  if (score >= 60) return "Medium";
  return "Low";
}

function getCropRecommendations(data: any) {
  const recommendations = [];

  // Calculate scores for each crop
  for (const [_, crop] of Object.entries(cropData)) {
    const score = calculateCropScore(
      {
        nitrogen: data.nitrogen,
        phosphorus: data.phosphorus,
        potassium: data.potassium,
        ph: data.ph,
        rainfall: data.rainfall,
      },
      crop
    );

    if (score > 50) {
      // Only recommend if score is above 50%
      recommendations.push({
        name: crop.name,
        confidence: score,
        expectedYield: `${calculateExpectedYield(crop, score)} tons/hectare`,
        profitability: getProfitabilityRating(score),
        details: generateRecommendationDetails(crop, score, data),
      });
    }
  }

  // Sort by confidence score and return top 3
  recommendations.sort((a, b) => b.confidence - a.confidence);
  return recommendations.slice(0, 3);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received request body:", body);

    const { nitrogen, phosphorus, potassium, ph, rainfall } = body;

    // --- Input Validation ---
    const values = [nitrogen, phosphorus, potassium, ph, rainfall].map(parseFloat);
    if (values.some(isNaN)) {
        return NextResponse.json(
            { error: "Invalid input: All values must be numbers." },
            { status: 400 }
        );
    }

    // Check if all numeric inputs are zero
    if (values.every(v => v === 0)) {
         return NextResponse.json(
            { error: "Invalid input: Cannot generate recommendations with all zero values." },
            { status: 400 }
        );
    }
    
    // Add other specific range checks if necessary (e.g., pH)
    const numericPh = parseFloat(ph);
    if (numericPh < 0 || numericPh > 14) {
       return NextResponse.json(
            { error: "Invalid input: pH value must be between 0 and 14." },
            { status: 400 }
        );
    }
    // --- End Input Validation ---

    const processedData = {
      nitrogen: parseFloat(nitrogen),
      phosphorus: parseFloat(phosphorus),
      potassium: parseFloat(potassium),
      ph: numericPh, // Use the validated numeric pH
      rainfall: parseFloat(rainfall),
    };

    console.log("Processed input data:", processedData);

    const recommendations = getCropRecommendations(processedData);
    console.log("Generated recommendations:", recommendations);

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Error processing crop recommendation request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
