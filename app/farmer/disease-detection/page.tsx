"use client";

import { useState, useRef, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Script from "next/script";

interface Disease {
  name: string;
  description: string;
  pesticides: string[];
  severity: "low" | "medium" | "high";
  treatment_timeline: string;
  preventive_measures: string[];
}

// Sample disease database (in a real app, this would come from an API/ML model)
const diseaseDatabase: { [key: string]: { [key: string]: Disease[] } } = {
  tomato: {
    leaf: [
      {
        name: "Early Blight",
        description:
          "Brown spots with concentric rings that enlarge over time.",
        pesticides: ["Mancozeb", "Chlorothalonil", "Copper-based fungicides"],
        severity: "medium",
        treatment_timeline:
          "Apply fungicides every 7-10 days until symptoms resolve",
        preventive_measures: [
          "Maintain proper plant spacing for air circulation",
          "Water at the base of plants",
          "Remove infected leaves promptly",
        ],
      },
      {
        name: "Late Blight",
        description: "Dark brown spots with fuzzy white growth on undersides.",
        pesticides: ["Metalaxyl", "Cymoxanil", "Azoxystrobin"],
        severity: "high",
        treatment_timeline:
          "Begin treatment immediately, apply fungicides every 5-7 days",
        preventive_measures: [
          "Plant resistant varieties",
          "Avoid overhead irrigation",
          "Monitor weather conditions",
        ],
      },
    ],
    fruit: [
      {
        name: "Blossom End Rot",
        description: "Dark, sunken spots at the bottom of fruits.",
        pesticides: ["Calcium supplements", "Proper irrigation management"],
        severity: "medium",
        treatment_timeline:
          "Apply calcium supplements weekly during fruit development",
        preventive_measures: [
          "Maintain consistent soil moisture",
          "Test soil pH and calcium levels",
          "Avoid over-fertilizing with nitrogen",
        ],
      },
    ],
  },
  rice: {
    leaf: [
      {
        name: "Blast",
        description: "Diamond-shaped lesions with gray centers.",
        pesticides: ["Tricyclazole", "Isoprothiolane", "Carbendazim"],
        severity: "high",
        treatment_timeline:
          "Apply fungicides at first sign of disease, repeat every 10-14 days",
        preventive_measures: [
          "Use resistant varieties",
          "Maintain proper water management",
          "Avoid excessive nitrogen",
        ],
      },
      {
        name: "Bacterial Blight",
        description: "Yellow to white lesions along leaf veins.",
        pesticides: ["Streptomycin", "Copper oxychloride", "Kasugamycin"],
        severity: "high",
        treatment_timeline:
          "Apply bactericides immediately upon detection, repeat weekly",
        preventive_measures: [
          "Use certified disease-free seeds",
          "Practice crop rotation",
          "Maintain field sanitation",
        ],
      },
    ],
    stem: [
      {
        name: "Stem Rot",
        description: "Dark brown lesions on stem near water level.",
        pesticides: ["Propiconazole", "Hexaconazole", "Validamycin"],
        severity: "medium",
        treatment_timeline:
          "Apply fungicides when symptoms appear, repeat after 15-20 days",
        preventive_measures: [
          "Avoid deep planting",
          "Maintain proper drainage",
          "Control water depth",
        ],
      },
    ],
  },
  potato: {
    leaf: [
      {
        name: "Late Blight",
        description: "Dark water-soaked spots turning brown with white edges.",
        pesticides: ["Mancozeb", "Chlorothalonil", "Metalaxyl"],
        severity: "high",
        treatment_timeline:
          "Apply fungicides every 7 days during favorable conditions",
        preventive_measures: [
          "Plant resistant varieties",
          "Destroy volunteer plants",
          "Improve field drainage",
        ],
      },
    ],
    tuber: [
      {
        name: "Common Scab",
        description: "Rough, corky patches on tuber surface.",
        pesticides: ["Soil treatment", "Sulfur-based products"],
        severity: "medium",
        treatment_timeline:
          "Treat soil before planting, maintain proper soil pH",
        preventive_measures: [
          "Maintain soil pH below 5.2",
          "Use resistant varieties",
          "Practice crop rotation",
        ],
      },
    ],
  },
  wheat: {
    leaf: [
      {
        name: "Leaf Rust",
        description: "Orange-brown pustules scattered on leaves",
        pesticides: ["Tebuconazole", "Propiconazole", "Azoxystrobin"],
        severity: "high",
        treatment_timeline:
          "Apply fungicides at first sign of disease, repeat every 14 days",
        preventive_measures: [
          "Plant resistant varieties",
          "Early planting",
          "Monitor regularly for symptoms",
        ],
      },
      {
        name: "Powdery Mildew",
        description: "White powdery growth on leaves and stems",
        pesticides: ["Sulfur", "Triadimefon", "Propiconazole"],
        severity: "medium",
        treatment_timeline:
          "Apply fungicides when disease first appears, repeat as needed",
        preventive_measures: [
          "Maintain proper spacing",
          "Avoid excess nitrogen",
          "Remove infected plant debris",
        ],
      },
    ],
  },
  corn: {
    leaf: [
      {
        name: "Northern Leaf Blight",
        description: "Long, cigar-shaped gray-green lesions",
        pesticides: ["Pyraclostrobin", "Azoxystrobin", "Propiconazole"],
        severity: "medium",
        treatment_timeline:
          "Apply fungicides at first sign, repeat every 14 days if needed",
        preventive_measures: [
          "Rotate crops",
          "Plant resistant hybrids",
          "Till infected debris",
        ],
      },
    ],
    stem: [
      {
        name: "Stalk Rot",
        description: "Brown discoloration and softening of stalk tissue",
        pesticides: ["Cultural control", "Proper plant nutrition"],
        severity: "high",
        treatment_timeline:
          "Preventive measures are key, chemical control limited",
        preventive_measures: [
          "Maintain balanced fertility",
          "Avoid high plant populations",
          "Control insects",
        ],
      },
    ],
  },
};

const crops = [
  "tomato",
  "rice",
  "potato",
  "wheat",
  "corn",
  "soybean",
  "cotton",
  // Add more crops as needed
];

const plantParts = [
  "leaf",
  "stem",
  "fruit",
  "root",
  "flower",
  "tuber",
  // Add more plant parts as needed
];

// Add print function
const printAnalysisResults = (
  detectedInfo: any,
  analysisResult: Disease | null,
  analysisMessage: string
) => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Plant Disease Analysis Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .section { margin-bottom: 20px; }
          .section-title { color: #1a73e8; font-size: 18px; margin-bottom: 10px; }
          .info-box { background: #f0f7ff; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
          .severity { display: inline-block; padding: 5px 10px; border-radius: 15px; }
          .severity.high { background: #fee2e2; color: #991b1b; }
          .severity.medium { background: #fef3c7; color: #92400e; }
          .severity.low { background: #dcfce7; color: #166534; }
          ul { padding-left: 20px; }
          .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Plant Disease Analysis Report</h1>
          <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
        ${
          detectedInfo
            ? `
        <div class="info-box">
          <strong>Detected Crop:</strong> ${
            detectedInfo.crop.charAt(0).toUpperCase() +
            detectedInfo.crop.slice(1)
          }<br>
          <strong>Affected Part:</strong> ${
            detectedInfo.part.charAt(0).toUpperCase() +
            detectedInfo.part.slice(1)
          }
        </div>
        `
            : ""
        }
        ${
          analysisMessage
            ? `
        <div class="section">
          <p>${analysisMessage}</p>
        </div>
        `
            : ""
        }
        ${
          analysisResult
            ? `
        <div class="section">
          <div class="section-title">Detected Disease</div>
          <p>${analysisResult.name}</p>
        </div>
        <div class="section">
          <div class="section-title">Severity Level</div>
          <p class="severity ${analysisResult.severity}">${
                analysisResult.severity.charAt(0).toUpperCase() +
                analysisResult.severity.slice(1)
              }</p>
        </div>
        <div class="section">
          <div class="section-title">Description</div>
          <p>${analysisResult.description}</p>
        </div>
        <div class="section">
          <div class="section-title">Treatment Timeline</div>
          <p>${analysisResult.treatment_timeline}</p>
        </div>
        <div class="section">
          <div class="section-title">Recommended Pesticides</div>
          <ul>
            ${analysisResult.pesticides
              .map((pesticide) => `<li>${pesticide}</li>`)
              .join("")}
          </ul>
        </div>
        <div class="section">
          <div class="section-title">Preventive Measures</div>
          <ul>
            ${analysisResult.preventive_measures
              .map((measure) => `<li>${measure}</li>`)
              .join("")}
          </ul>
        </div>
        `
            : ""
        }
        <div class="footer">
          <p>Generated by KrishiMitra Disease Detection System</p>
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.print();
};

export default function DiseaseDetectionPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<Disease | null>(null);
  const [analysisMessage, setAnalysisMessage] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");
  const [detectedInfo, setDetectedInfo] = useState<{
    crop: string;
    part: string;
  } | null>(null);
  const [model, setModel] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [multipleResults, setMultipleResults] = useState<
    Array<{
      name: string;
      confidence: number;
      details: Disease;
    }>
  >([]);

  // Initialize TensorFlow.js model
  useEffect(() => {
    async function loadModel() {
      try {
        // Load TensorFlow.js
        const tf = (window as any).tf;
        if (!tf) {
          console.error("TensorFlow.js not loaded");
          return;
        }

        // Load the model (replace with your actual model URL)
        const loadedModel = await tf.loadLayersModel(
          "https://storage.googleapis.com/your-model-url/model.json"
        );
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading model:", error);
        setAnalysisMessage(
          "Error loading the disease detection model. Please try again later."
        );
      }
    }

    loadModel();
  }, []);

  const preprocessImage = async (imageElement: HTMLImageElement) => {
    const tf = (window as any).tf;
    return tf.tidy(() => {
      // Convert the image to a tensor
      let tensor = tf.browser
        .fromPixels(imageElement)
        .resizeNearestNeighbor([224, 224]) // resize to model input size
        .toFloat();

      // Normalize the image
      tensor = tensor.div(255.0);

      // Add batch dimension
      return tensor.expandDims(0);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError("");
    setAnalysisMessage("");
    setAnalysisResult(null);
    setDetectedInfo(null);

    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setImageError("File size should be less than 5MB");
        setSelectedImage(null);
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setImageError("Please upload an image file");
        setSelectedImage(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.onerror = () => {
        setImageError("Failed to read the image file");
        setSelectedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePlant = async () => {
    if (!selectedImage) {
      setAnalysisMessage("Please upload an image first");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisMessage("");
    setAnalysisResult(null);
    setDetectedInfo(null);

    try {
      // Create an image element for analysis
      const img = new Image();
      img.src = selectedImage;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Simulate multiple disease detection with confidence scores
      // In a real implementation, this would use actual ML model predictions
      const imageAnalysis = await analyzeImage(img);

      // Send analysis results to the API
      const formData = new FormData();
      formData.append("predictions", JSON.stringify(imageAnalysis));

      const response = await fetch("/api/disease-detection", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze image");
      }

      if (data.status === "error") {
        setAnalysisMessage(data.message);
        return;
      }

      setDetectedInfo({
        crop: data.detectedCrop,
        part: data.detectedPart,
      });

      if (data.diseases && data.diseases.length > 0) {
        // Show multiple diseases if detected
        setMultipleResults(data.diseases);
      } else {
        setAnalysisMessage("No diseases detected. The plant appears healthy.");
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysisMessage("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Add function to analyze image and detect multiple diseases
  const analyzeImage = async (imageElement: HTMLImageElement) => {
    // This is a simulation of ML model analysis
    // In a real implementation, this would use actual ML model predictions

    // Simulate visual analysis based on image characteristics
    const imageFeatures = await extractImageFeatures(imageElement);

    // Based on the features, determine possible diseases
    const possibleDiseases = [];

    if (imageFeatures.hasYellowPatches) {
      possibleDiseases.push({
        crop: "rice",
        disease: "bacterial_blight",
        confidence: 0.85,
        part: "leaf",
      });
    }

    if (imageFeatures.hasBrownSpots) {
      possibleDiseases.push({
        crop: "tomato",
        disease: "early_blight",
        confidence: 0.78,
        part: "leaf",
      });
    }

    if (imageFeatures.hasWhiteGrowth) {
      possibleDiseases.push({
        crop: "wheat",
        disease: "powdery_mildew",
        confidence: 0.92,
        part: "leaf",
      });
    }

    return {
      diseases: possibleDiseases,
      primaryCrop: possibleDiseases[0]?.crop || "unknown",
      primaryPart: possibleDiseases[0]?.part || "leaf",
    };
  };

  // Add function to extract image features
  const extractImageFeatures = async (imageElement: HTMLImageElement) => {
    // This is a simulation of image feature extraction
    // In a real implementation, this would use computer vision techniques

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    context?.drawImage(imageElement, 0, 0);

    // Simulate feature detection based on image analysis
    const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData?.data;

    let yellowPixels = 0;
    let brownPixels = 0;
    let whitePixels = 0;

    // Analyze pixel data
    if (data) {
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Simple color detection
        if (r > 200 && g > 200 && b < 100) yellowPixels++;
        if (r > 150 && g < 100 && b < 100) brownPixels++;
        if (r > 200 && g > 200 && b > 200) whitePixels++;
      }
    }

    const totalPixels = canvas.width * canvas.height || 1;

    return {
      hasYellowPatches: yellowPixels / totalPixels > 0.1,
      hasBrownSpots: brownPixels / totalPixels > 0.1,
      hasWhiteGrowth: whitePixels / totalPixels > 0.15,
    };
  };

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.2.0/dist/tf.min.js"
        strategy="beforeInteractive"
      />
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">
                  Plant Disease Detection
                </h1>
                <p className="text-gray-600">
                  Upload a plant image to automatically detect the crop type,
                  affected part, and any potential diseases.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Upload Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                      imageError
                        ? "border-red-500"
                        : selectedImage
                        ? "border-green-500"
                        : "border-gray-300 hover:border-primary"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {selectedImage ? (
                      <div className="relative h-64 w-full">
                        <Image
                          src={selectedImage}
                          alt="Selected plant"
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="py-12">
                        <svg
                          className={`w-12 h-12 mx-auto mb-4 ${
                            imageError ? "text-red-400" : "text-gray-400"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p
                          className={`${
                            imageError ? "text-red-500" : "text-gray-500"
                          }`}
                        >
                          {imageError || "Click to upload or drag and drop"}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>

                  {/* Analysis Section */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Analysis</h2>
                    <div className="space-y-4">
                      {detectedInfo && (
                        <div className="p-4 bg-blue-50 rounded-md">
                          <p className="text-blue-800">
                            <span className="font-semibold">
                              Detected Crop:
                            </span>{" "}
                            {detectedInfo.crop.charAt(0).toUpperCase() +
                              detectedInfo.crop.slice(1)}
                          </p>
                          <p className="text-blue-800 mt-1">
                            <span className="font-semibold">
                              Affected Part:
                            </span>{" "}
                            {detectedInfo.part.charAt(0).toUpperCase() +
                              detectedInfo.part.slice(1)}
                          </p>
                        </div>
                      )}
                      <button
                        onClick={analyzePlant}
                        disabled={!selectedImage || isAnalyzing}
                        className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                      >
                        {isAnalyzing ? "Analyzing..." : "Analyze Plant"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Analysis Results */}
                {(multipleResults.length > 0 || analysisMessage) && (
                  <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">
                        Analysis Results
                      </h2>
                      <button
                        onClick={() =>
                          printAnalysisResults(
                            detectedInfo,
                            multipleResults[0]?.details || null,
                            analysisMessage
                          )
                        }
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                          />
                        </svg>
                        Print Details
                      </button>
                    </div>

                    {analysisMessage ? (
                      <div
                        className={`p-4 rounded-md ${
                          analysisMessage.includes("healthy")
                            ? "bg-green-50 text-green-800"
                            : "bg-blue-50 text-blue-800"
                        }`}
                      >
                        <p>{analysisMessage}</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {multipleResults.map((result, index) => (
                          <div
                            key={index}
                            className="border-b pb-6 last:border-b-0"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-semibold text-lg text-primary">
                                Disease {index + 1}: {result.name}
                              </h3>
                              <span className="text-sm text-gray-500">
                                Confidence:{" "}
                                {(result.confidence * 100).toFixed(1)}%
                              </span>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-gray-700">
                                  Severity Level
                                </h4>
                                <p
                                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                                    result.details.severity === "high"
                                      ? "bg-red-100 text-red-800"
                                      : result.details.severity === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {result.details.severity
                                    .charAt(0)
                                    .toUpperCase() +
                                    result.details.severity.slice(1)}
                                </p>
                              </div>

                              <div>
                                <h4 className="font-semibold text-gray-700">
                                  Description
                                </h4>
                                <p className="text-gray-600">
                                  {result.details.description}
                                </p>
                              </div>

                              <div>
                                <h4 className="font-semibold text-gray-700">
                                  Treatment Timeline
                                </h4>
                                <p className="text-gray-600">
                                  {result.details.treatment_timeline}
                                </p>
                              </div>

                              <div>
                                <h4 className="font-semibold text-gray-700">
                                  Recommended Pesticides
                                </h4>
                                <ul className="list-disc list-inside text-gray-600">
                                  {result.details.pesticides.map(
                                    (pesticide, idx) => (
                                      <li key={idx}>{pesticide}</li>
                                    )
                                  )}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold text-gray-700">
                                  Preventive Measures
                                </h4>
                                <ul className="list-disc list-inside text-gray-600">
                                  {result.details.preventive_measures.map(
                                    (measure, idx) => (
                                      <li key={idx}>{measure}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
