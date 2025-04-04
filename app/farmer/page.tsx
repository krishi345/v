import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function FarmerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        {/* Header Section */}
        <div className="pt-20 pb-8 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-center">
              For <span className="text-primary">Farmers</span>
            </h1>
            <p className="mt-4 text-lg text-center text-foreground/80 max-w-3xl mx-auto">
              Empowering farmers with AI technology to increase yield, reduce losses, and promote sustainable practices.
            </p>
          </div>
        </div>
        
        {/* Core Features Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Core <span className="text-primary">Features</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Feature 1: Crop Recommendation Model */}
              <div className="bg-background border border-primary/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 bg-primary/10 rounded-full inline-flex mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Crop Recommendation Model</h3>
                <p className="text-foreground/80 mb-4">
                  Get personalized crop recommendations based on soil NPK values, location weather conditions, budget, and land area.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Enter soil NPK values</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Auto-detect weather from your location</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Set budget and land constraints</span>
                  </li>
                </ul>
                <Link href="/crop-recommendation" className="text-primary font-medium flex items-center hover:underline">
                  Try it now
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              
              {/* Feature 2: Disease Detection */}
              <div className="bg-background border border-primary/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 bg-primary/10 rounded-full inline-flex mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Disease Detection</h3>
                <p className="text-foreground/80 mb-4">
                  Upload images of your crops to quickly identify diseases and get treatment recommendations.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Simple photo upload interface</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Detects common crop diseases</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Treatment and prevention advice</span>
                  </li>
                </ul>
                <Link href="/disease-detection" className="text-primary font-medium flex items-center hover:underline">
                  Try it now
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              
              {/* Feature 3: Fertilizer & Tips */}
              <div className="bg-background border border-primary/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 bg-primary/10 rounded-full inline-flex mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Fertilizer & Growth Tips</h3>
                <p className="text-foreground/80 mb-4">
                  Get customized fertilizer recommendations and best practices based on your soil conditions and selected crops.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tailored fertilizer formulations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Application timing and techniques</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Expert growing tips and best practices</span>
                  </li>
                </ul>
                <Link href="/fertilizer-recommendations" className="text-primary font-medium flex items-center hover:underline">
                  Try it now
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Loans Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-primary/5 to-primary/20 rounded-xl p-8 md:p-10 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                  <div className="p-4 bg-white/90 rounded-full shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                      Agricultural Loans for Farmers
                    </h2>
                    <p className="text-foreground/80 mb-6">
                      Access affordable financing tailored for your farming needs with lower interest rates, flexible repayment options aligned with harvest cycles, and minimal documentation.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Interest rates from 4%</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Quick disbursement</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>No collateral up to ₹1 lakh</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Simple application process</span>
                      </li>
                    </ul>
                    <Link href="/loans" className="inline-flex items-center bg-primary text-white font-medium py-3 px-6 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                      Apply for a Loan
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Additional Services Section */}
        <section className="py-16 md:py-20 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Additional <span className="text-primary">Services</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Service 1: Subsidies */}
              <div className="bg-background rounded-lg p-6 shadow-sm border border-muted">
                <div className="p-3 bg-primary/10 rounded-full inline-flex mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Subsidies</h3>
                <p className="text-sm text-foreground/80 mb-4">
                  Discover and apply for government subsidies and support programs for farmers.
                </p>
                <span className="text-primary/70 text-sm font-medium italic">Coming Soon</span>
              </div>
              
              {/* Service 2: Farmer Network */}
              <div className="bg-background rounded-lg p-6 shadow-sm border border-muted">
                <div className="p-3 bg-primary/10 rounded-full inline-flex mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Farmer Network</h3>
                <p className="text-sm text-foreground/80 mb-4">
                  Connect with other farmers to share knowledge, resources, and support each other.
                </p>
                <span className="text-primary/70 text-sm font-medium italic">Coming Soon</span>
              </div>
              
              {/* Service 3: Announcements */}
              <div className="bg-background rounded-lg p-6 shadow-sm border border-muted">
                <div className="p-3 bg-primary/10 rounded-full inline-flex mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Announcements</h3>
                <p className="text-sm text-foreground/80 mb-4">
                  Stay updated with the latest agricultural news, policies, and important announcements.
                </p>
                <span className="text-primary/70 text-sm font-medium italic">Coming Soon</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-gradient-to-r from-primary/10 to-primary/20 rounded-xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Start Your Smart Farming Journey Today
                </h2>
                <p className="text-lg text-foreground/80 mb-8">
                  Join thousands of farmers who are already using KrishiMitra AI to increase their yields and improve their farming practices.
                </p>
                <p className="text-md text-foreground/90">
                  Our AI models are extensively tested and validated with real-world data from Indian farms across different regions and crop varieties.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 