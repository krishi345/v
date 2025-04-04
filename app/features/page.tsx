import FeaturesSection from '../components/FeaturesSection';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <div className="pt-20 pb-8 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-center">
              Our <span className="text-primary">Features</span>
            </h1>
            <p className="mt-4 text-lg text-center text-foreground/80 max-w-3xl mx-auto">
              Explore the cutting-edge features of KrishiMitra AI that are empowering farmers across India.
            </p>
          </div>
        </div>
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
} 