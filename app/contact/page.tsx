import ContactSection from '../components/ContactSection';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <div className="pt-20 pb-8 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-center">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="mt-4 text-lg text-center text-foreground/80 max-w-3xl mx-auto">
              Get in touch with our team to learn more about KrishiMitra AI or to discuss how we can help you.
            </p>
          </div>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
} 