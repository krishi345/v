import { NextResponse } from "next/server";

// Disease database with information about different plant diseases
const diseaseDatabase = {
  tomato: {
    early_blight: {
      name: "Early Blight",
      description: "Brown spots with concentric rings that enlarge over time.",
      pesticides: ["Mancozeb", "Chlorothalonil", "Copper-based fungicides"],
      severity: "medium" as const,
      treatment_timeline:
        "Apply fungicides every 7-10 days until symptoms resolve",
      preventive_measures: [
        "Maintain proper plant spacing for air circulation",
        "Water at the base of plants",
        "Remove infected leaves promptly",
      ],
    },
    late_blight: {
      name: "Late Blight",
      description: "Dark brown spots with fuzzy white growth on undersides.",
      pesticides: ["Metalaxyl", "Cymoxanil", "Azoxystrobin"],
      severity: "high" as const,
      treatment_timeline:
        "Begin treatment immediately, apply fungicides every 5-7 days",
      preventive_measures: [
        "Plant resistant varieties",
        "Avoid overhead irrigation",
        "Monitor weather conditions",
      ],
    },
  },
  potato: {
    early_blight: {
      name: "Early Blight",
      description: "Dark brown to black lesions with concentric rings.",
      pesticides: ["Mancozeb", "Chlorothalonil", "Copper-based fungicides"],
      severity: "medium" as const,
      treatment_timeline:
        "Apply fungicides every 7-10 days in favorable conditions",
      preventive_measures: [
        "Rotate crops",
        "Remove volunteer plants",
        "Maintain proper plant spacing",
      ],
    },
    late_blight: {
      name: "Late Blight",
      description: "Dark water-soaked spots turning brown with white edges.",
      pesticides: ["Mancozeb", "Chlorothalonil", "Metalaxyl"],
      severity: "high" as const,
      treatment_timeline:
        "Apply fungicides every 7 days during favorable conditions",
      preventive_measures: [
        "Plant resistant varieties",
        "Destroy volunteer plants",
        "Improve field drainage",
      ],
    },
  },
  rice: {
    bacterial_blight: {
      name: "Bacterial Blight",
      description:
        "Yellow to white lesions along leaf veins, which can merge and cause leaf death.",
      pesticides: ["Streptomycin", "Copper oxychloride", "Kasugamycin"],
      severity: "high" as const,
      treatment_timeline:
        "Apply bactericides immediately upon detection, repeat weekly",
      preventive_measures: [
        "Use certified disease-free seeds",
        "Practice crop rotation",
        "Maintain field sanitation",
      ],
    },
    blast: {
      name: "Rice Blast",
      description: "Diamond-shaped lesions with gray centers on leaves.",
      pesticides: ["Tricyclazole", "Isoprothiolane", "Carbendazim"],
      severity: "high" as const,
      treatment_timeline:
        "Apply fungicides at first sign of disease, repeat every 10-14 days",
      preventive_measures: [
        "Use resistant varieties",
        "Maintain proper water management",
        "Avoid excessive nitrogen",
      ],
    },
  },
  wheat: {
    powdery_mildew: {
      name: "Powdery Mildew",
      description: "White powdery growth on leaves and stems",
      pesticides: ["Sulfur", "Triadimefon", "Propiconazole"],
      severity: "medium" as const,
      treatment_timeline:
        "Apply fungicides when disease first appears, repeat as needed",
      preventive_measures: [
        "Maintain proper spacing",
        "Avoid excess nitrogen",
        "Remove infected plant debris",
      ],
    },
    leaf_rust: {
      name: "Leaf Rust",
      description: "Orange-brown pustules scattered on leaves",
      pesticides: ["Tebuconazole", "Propiconazole", "Azoxystrobin"],
      severity: "high" as const,
      treatment_timeline:
        "Apply fungicides at first sign of disease, repeat every 14 days",
      preventive_measures: [
        "Plant resistant varieties",
        "Early planting",
        "Monitor regularly for symptoms",
      ],
    },
  },
};

export async function POST(request: Request) {
  try {
    let analysisData;
    const contentType = request.headers.get('content-type') || '';

    // Check content type before trying to read form data
    if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
         console.log("Processing as form data...");
         const data = await request.formData();
         const predictionsJson = data.get("predictions") as string;
         if (!predictionsJson) {
              throw new Error("Missing 'predictions' field in form data.");
         }
         analysisData = JSON.parse(predictionsJson);
    } else if (contentType.includes('application/json')) {
        console.log("Processing as JSON data...");
        // If it's JSON, parse the body directly
        const body = await request.json();
        analysisData = body; // Assuming the body is the analysis data
    } else {
        return NextResponse.json(
            { error: `Unsupported Content-Type: ${contentType}` }, 
            { status: 415 } // Unsupported Media Type
        );
    }

    console.log("Received analysis data:", analysisData);

    if (!analysisData || !analysisData.diseases) {
      console.error("Invalid or missing disease data structure");
      return NextResponse.json(
        { error: "Invalid analysis data received" },
        { status: 400 }
      );
    }

    const detectedDiseases = analysisData.diseases
      .map((detection: any) => {
        const diseaseInfo =
          diseaseDatabase[detection.crop as keyof typeof diseaseDatabase]?.[
            detection.disease as string
          ];

        if (!diseaseInfo) {
          return null;
        }

        return {
          name: diseaseInfo.name,
          confidence: detection.confidence,
          details: {
            ...diseaseInfo,
            confidence: detection.confidence,
          },
        };
      })
      .filter(Boolean);

    if (detectedDiseases.length === 0) {
      return NextResponse.json({
        status: "success",
        detectedCrop: analysisData.primaryCrop,
        detectedPart: analysisData.primaryPart,
        hasDisease: false,
        message: `The plant appears healthy. Continue with regular care and monitoring.`,
      });
    }

    return NextResponse.json({
      status: "success",
      detectedCrop: analysisData.primaryCrop,
      detectedPart: analysisData.primaryPart,
      hasDisease: true,
      diseases: detectedDiseases,
    });
  } catch (error: any) {
    console.error("Error in disease detection API:", error);
    const errorMessage = error.message || "Failed to process disease detection request";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
