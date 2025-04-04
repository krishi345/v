import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function CallCenterPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              KrishiMitra <span className="text-primary">Call Center</span>
            </h1>
            
            <div className="bg-background border border-primary/20 rounded-xl p-8 shadow-sm mb-12">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-primary/10 rounded-full p-6 mb-6">
                  <svg className="w-16 h-16 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold mb-2">Contact Customer Support</h2>
                
                <p className="text-lg text-foreground/80 mb-4">
                  Need help? Reach out to our support team.
                </p>
                
                <a 
                  href="tel:9949246650"
                  className="inline-flex items-center bg-primary text-primary-foreground rounded-full px-6 py-3 font-medium text-lg hover:bg-primary/90 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                   9949246650
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background border border-foreground/10 rounded-xl p-6 text-left">
                <h3 className="font-bold text-xl mb-4">Services to be offered</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>24/7 agricultural expert assistance</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Crop disease diagnostics over call</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Market price information</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Weather advisory services</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-background border border-foreground/10 rounded-xl p-6 text-left">
                <h3 className="font-bold text-xl mb-4">Operational Hours</h3>
                <p className="text-foreground/80 mb-4">
                  When launched, our call center will operate in the following languages:
                </p>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center border-b border-foreground/10 py-2">
                    <span>Hindi</span>
                    <span className="font-medium">6 AM - 10 PM</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-foreground/10 py-2">
                    <span>English</span>
                    <span className="font-medium">6 AM - 10 PM</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-foreground/10 py-2">
                    <span>Marathi</span>
                    <span className="font-medium">8 AM - 8 PM</span>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <span>Other Regional Languages</span>
                    <span className="font-medium">9 AM - 6 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 