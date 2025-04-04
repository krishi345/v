import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import RevenueSection from './components/RevenueSection';
import Footer from './components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <HeroSection />
        
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Our <span className="text-primary">Model</span>
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                KrishiMitra AI connects farmers and consumers, creating a sustainable ecosystem.
              </p>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full mt-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <Link href="/farmer" className="group">
                <div className="bg-background border-2 border-primary/20 rounded-lg p-8 h-full transition-all duration-300 group-hover:border-primary group-hover:shadow-lg">
                  <div className="p-4 bg-primary/10 rounded-full inline-flex mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">For Farmers</h3>
                  <p className="text-foreground/80">
                    Access AI-powered tools to increase yield, reduce losses, and connect with consumers directly.
                  </p>
                  <div className="mt-6 flex items-center text-primary font-medium">
                    Learn more
                    <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                </div>
              </Link>
              
              <Link href="/consumer" className="group">
                <div className="bg-background border-2 border-secondary/20 rounded-lg p-8 h-full transition-all duration-300 group-hover:border-secondary group-hover:shadow-lg">
                  <div className="p-4 bg-secondary/10 rounded-full inline-flex mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-secondary transition-colors">For Consumers</h3>
                  <p className="text-foreground/80">
                    Get fresh, sustainably grown produce directly from farmers, with full transparency.
                  </p>
                  <div className="mt-6 flex items-center text-secondary font-medium">
                    Learn more
                    <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        <RevenueSection />
      </main>
      <Footer />
    </div>
  );
}
