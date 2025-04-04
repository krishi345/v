'use client';

import { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function DiseaseDetectionPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [plantType, setPlantType] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File is too large. Maximum size is 10MB.");
        return;
      }
      
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0] || null;
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File is too large. Maximum size is 10MB.");
        return;
      }
      
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handlePlantTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlantType(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select an image to analyze");
      return;
    }
    
    setIsAnalyzing(true);
    
    // Mock API call
    setTimeout(() => {
      // Generate results based on the selected plant type
      let mockResults;
      
      if (plantType === 'tomato') {
        mockResults = {
          disease: "Late Blight",
          confidence: 94.8,
          description: "Late blight is caused by the fungus-like oomycete pathogen Phytophthora infestans. It primarily affects leaves, stems, and fruits of tomato plants.",
          symptoms: [
            "Water-soaked light to dark green spots on leaves",
            "White fuzzy growth on the underside of leaves",
            "Dark brown lesions on stems",
            "Rapid wilting and death of foliage"
          ],
          treatment: [
            "Remove and destroy all infected plant parts",
            "Apply copper-based fungicide as a preventative measure",
            "Ensure proper spacing between plants for good air circulation",
            "Water at the base of plants instead of overhead to keep foliage dry"
          ],
          prevention: [
            "Use certified disease-free seed or resistant varieties",
            "Practice crop rotation (don't plant tomatoes in the same location for 3-4 years)",
            "Keep the garden clean of plant debris",
            "Apply preventative fungicides during humid weather"
          ]
        };
      } else if (plantType === 'rice') {
        mockResults = {
          disease: "Bacterial Leaf Blight",
          confidence: 92.1,
          description: "Bacterial leaf blight is caused by Xanthomonas oryzae pv. oryzae. It's one of the most serious diseases of rice in Asia.",
          symptoms: [
            "Water-soaked lesions on leaf margins",
            "Lesions turn yellow and then white as they expand",
            "Infected leaves wilt and dry quickly",
            "Milky bacterial ooze may be visible on young lesions"
          ],
          treatment: [
            "There are no effective chemical controls once infection occurs",
            "Remove and destroy infected plants",
            "Drain fields to reduce humidity",
            "Use balanced fertilization (avoid excess nitrogen)"
          ],
          prevention: [
            "Plant resistant varieties",
            "Use healthy, certified seeds",
            "Avoid clipping leaf tips during transplanting",
            "Maintain field sanitation by removing weed hosts"
          ]
        };
      } else if (plantType === 'potato') {
        mockResults = {
          disease: "Early Blight",
          confidence: 89.3,
          description: "Early blight is caused by the fungus Alternaria solani. It affects leaves, stems and tubers and can reduce yield significantly.",
          symptoms: [
            "Dark, concentric rings forming a target-like pattern on leaves",
            "Yellowing of leaf tissue surrounding lesions",
            "Lower leaves are affected first, disease progresses upward",
            "Brown, corky areas on tubers"
          ],
          treatment: [
            "Apply registered fungicides according to label directions",
            "Remove infected leaves to slow disease spread",
            "Ensure adequate plant nutrition to improve resistance",
            "Provide consistent watering to reduce plant stress"
          ],
          prevention: [
            "Use disease-free seed potatoes",
            "Practice crop rotation (3-4 year cycle)",
            "Space plants properly for good air circulation",
            "Keep plants well-mulched to prevent soil splash"
          ]
        };
      } else {
        // Default for other plant types or unspecified
        mockResults = {
          disease: "Leaf Spot Disease",
          confidence: 86.5,
          description: "Leaf spot diseases can be caused by various fungi and bacteria. This appears to be a fungal infection affecting the foliage.",
          symptoms: [
            "Circular to irregular spots on leaves with defined margins",
            "Spots may have dark borders with lighter centers",
            "Affected areas may turn yellow and drop out, creating a shot-hole appearance",
            "Severe infections can cause premature leaf drop"
          ],
          treatment: [
            "Apply appropriate fungicides based on specific pathogen",
            "Remove and destroy severely infected leaves",
            "Improve air circulation around plants",
            "Avoid overhead watering to keep foliage dry"
          ],
          prevention: [
            "Select resistant plant varieties when available",
            "Rotate crops to reduce pathogen buildup in soil",
            "Avoid working with plants when they're wet",
            "Practice good garden sanitation by removing plant debris"
          ]
        };
      }
      
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 2500);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPlantType('');
    setResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Plant Disease <span className="text-primary">Detection</span>
            </h1>
            <p className="text-lg text-center text-foreground/80 mb-8">
              Upload an image of your crop to quickly identify diseases and get recommended treatments.
            </p>

            {!results ? (
              <div className="bg-background border border-primary/20 rounded-xl p-6 md:p-8 shadow-sm">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-foreground">Upload Plant Image</h2>
                      <p className="text-sm text-foreground/70">
                        For best results, take a clear photo of the affected area in natural light.
                      </p>
                    </div>

                    <div 
                      className={`border-2 border-dashed ${previewUrl ? 'border-primary/50' : 'border-primary/30'} rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors`}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        id="image-upload"
                        className="hidden"
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={handleFileChange}
                      />
                      {previewUrl ? (
                        <div className="relative mx-auto w-full max-w-md">
                          <Image 
                            src={previewUrl} 
                            alt="Plant preview" 
                            width={400} 
                            height={300}
                            className="mx-auto rounded-md max-h-64 w-auto object-contain"
                          />
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFile(null);
                              setPreviewUrl(null);
                              if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                              }
                            }}
                            className="absolute top-2 right-2 bg-background/80 rounded-full p-1 hover:bg-background"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mx-auto text-primary/50"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="mt-2 text-foreground">
                            <span className="text-primary font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-foreground/60 mt-1">JPG, PNG or JPEG (max. 10MB)</p>
                        </>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Plant Type (Optional)</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className={`border rounded-md p-3 flex items-center hover:border-primary cursor-pointer ${plantType === 'tomato' ? 'border-primary bg-primary/5' : ''}`}>
                          <input 
                            type="radio" 
                            id="tomato" 
                            name="plant-type" 
                            value="tomato" 
                            checked={plantType === 'tomato'} 
                            onChange={handlePlantTypeChange} 
                            className="mr-2" 
                          />
                          <label htmlFor="tomato" className="cursor-pointer">Tomato</label>
                        </div>
                        <div className={`border rounded-md p-3 flex items-center hover:border-primary cursor-pointer ${plantType === 'potato' ? 'border-primary bg-primary/5' : ''}`}>
                          <input 
                            type="radio" 
                            id="potato" 
                            name="plant-type" 
                            value="potato" 
                            checked={plantType === 'potato'} 
                            onChange={handlePlantTypeChange} 
                            className="mr-2" 
                          />
                          <label htmlFor="potato" className="cursor-pointer">Potato</label>
                        </div>
                        <div className={`border rounded-md p-3 flex items-center hover:border-primary cursor-pointer ${plantType === 'rice' ? 'border-primary bg-primary/5' : ''}`}>
                          <input 
                            type="radio" 
                            id="rice" 
                            name="plant-type" 
                            value="rice" 
                            checked={plantType === 'rice'} 
                            onChange={handlePlantTypeChange} 
                            className="mr-2" 
                          />
                          <label htmlFor="rice" className="cursor-pointer">Rice</label>
                        </div>
                        <div className={`border rounded-md p-3 flex items-center hover:border-primary cursor-pointer ${plantType === 'wheat' ? 'border-primary bg-primary/5' : ''}`}>
                          <input 
                            type="radio" 
                            id="wheat" 
                            name="plant-type" 
                            value="wheat" 
                            checked={plantType === 'wheat'} 
                            onChange={handlePlantTypeChange} 
                            className="mr-2" 
                          />
                          <label htmlFor="wheat" className="cursor-pointer">Wheat</label>
                        </div>
                        <div className={`border rounded-md p-3 flex items-center hover:border-primary cursor-pointer ${plantType === 'cotton' ? 'border-primary bg-primary/5' : ''}`}>
                          <input 
                            type="radio" 
                            id="cotton" 
                            name="plant-type" 
                            value="cotton" 
                            checked={plantType === 'cotton'} 
                            onChange={handlePlantTypeChange} 
                            className="mr-2" 
                          />
                          <label htmlFor="cotton" className="cursor-pointer">Cotton</label>
                        </div>
                        <div className={`border rounded-md p-3 flex items-center hover:border-primary cursor-pointer ${plantType === 'other' ? 'border-primary bg-primary/5' : ''}`}>
                          <input 
                            type="radio" 
                            id="other" 
                            name="plant-type" 
                            value="other" 
                            checked={plantType === 'other'} 
                            onChange={handlePlantTypeChange} 
                            className="mr-2" 
                          />
                          <label htmlFor="other" className="cursor-pointer">Other</label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-primary text-white font-medium py-3 px-4 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70"
                        disabled={isAnalyzing || !selectedFile}
                      >
                        {isAnalyzing ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing Image...
                          </span>
                        ) : (
                          'Analyze Image'
                        )}
                      </button>
                      <p className="text-xs text-center text-foreground/60 mt-2">
                        Our AI model will analyze your image to identify plant diseases.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-background border border-primary/20 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Analysis Results</h2>
                  <button 
                    onClick={resetForm}
                    className="text-primary hover:text-primary/80 font-medium flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    New Analysis
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  {previewUrl && (
                    <div className="md:w-1/3">
                      <div className="border rounded-md overflow-hidden">
                        <Image 
                          src={previewUrl} 
                          alt="Analyzed plant" 
                          width={300} 
                          height={300} 
                          className="w-full h-auto object-cover"
                        />
                      </div>
                      <div className="mt-2 text-sm text-foreground/70 text-center">
                        <span className="font-medium">Plant type:</span> {plantType || "Unspecified"}
                      </div>
                    </div>
                  )}
                  
                  <div className={previewUrl ? "md:w-2/3" : "w-full"}>
                    <div className="p-4 border border-primary/20 rounded-md bg-primary/5">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-bold text-foreground">{results.disease}</h3>
                        <span className="inline-block bg-primary text-white text-sm font-medium px-2.5 py-1 rounded-full">
                          {results.confidence}% Confidence
                        </span>
                      </div>
                      <p className="text-foreground/80 mb-4">
                        {results.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="border border-foreground/10 rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-3 flex items-center text-foreground">
                      <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Symptoms
                    </h3>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      {results.symptoms.map((symptom: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-1 h-1 bg-foreground/60 rounded-full mt-1.5 mr-2"></span>
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border border-foreground/10 rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-3 flex items-center text-foreground">
                      <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Treatment
                    </h3>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      {results.treatment.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-1 h-1 bg-foreground/60 rounded-full mt-1.5 mr-2"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border border-foreground/10 rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-3 flex items-center text-foreground">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Prevention
                    </h3>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      {results.prevention.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-1 h-1 bg-foreground/60 rounded-full mt-1.5 mr-2"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Important Note:</p>
                      <p className="text-sm text-yellow-700">
                        This analysis is provided as a general guide. For severe cases or when in doubt, consult with a local agricultural expert or extension service.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={() => window.print()}
                    className="w-full bg-foreground/10 text-foreground font-medium py-3 px-4 rounded-md hover:bg-foreground/20 transition-colors"
                  >
                    Print or Save Results
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-center">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-primary/10 rounded-full p-4 mb-4">
                    <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">1. Take a Photo</h3>
                  <p className="text-foreground/80 text-sm">
                    Take a clear photo of the affected plant part. Make sure the image is well-lit and focused.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-primary/10 rounded-full p-4 mb-4">
                    <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">2. Upload Image</h3>
                  <p className="text-foreground/80 text-sm">
                    Upload the photo to our system and specify the plant type for more accurate results.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-primary/10 rounded-full p-4 mb-4">
                    <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">3. Get Results</h3>
                  <p className="text-foreground/80 text-sm">
                    Receive detailed information about the detected disease, including treatment options and prevention tips.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 