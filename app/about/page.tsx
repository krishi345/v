import AboutSection from '../components/AboutSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ImpactSection from '../components/ImpactSection';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <div className="pt-20 pb-8 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-center">
              About <span className="text-primary">KrishiMitra AI</span>
            </h1>
            <p className="mt-4 text-lg text-center text-foreground/80 max-w-3xl mx-auto">
              Learn about our mission, impact, and how our technology works to empower farmers.
            </p>
          </div>
        </div>
        
        <AboutSection />
        
        <div className="pt-16 pb-8 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              How <span className="text-primary">It Works</span>
            </h2>
            <p className="mt-4 text-lg text-center text-foreground/80 max-w-2xl mx-auto">
              Our three-tier approach integrates data collection, AI analysis, and user engagement.
            </p>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mt-6"></div>
          </div>
        </div>
        <HowItWorksSection />
        
        <div className="pt-16 pb-8 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Our <span className="text-primary">Impact</span>
            </h2>
            <p className="mt-4 text-lg text-center text-foreground/80 max-w-2xl mx-auto">
              KrishiMitra AI empowers farmers to achieve sustainable growth while contributing to global food security.
            </p>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mt-6"></div>
          </div>
        </div>
        <ImpactSection />
      </main>
      <Footer />
    </div>
  );
} 