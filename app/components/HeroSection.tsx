import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted min-h-[calc(100vh-76px)] flex items-center">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              <span className="text-primary">Empowering</span> Smallholder Farmers
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-lg">
              KrishiMitra AI integrates traditional farming wisdom with cutting-edge technology to reduce crop losses, increase yield, and promote sustainable farming practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/farmer" className="btn-primary inline-flex items-center justify-center">
                For Farmers
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
              <Link href="/consumer" className="btn-secondary inline-flex items-center justify-center">
                For Consumers
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div className="relative h-64 md:h-auto">
            <Image
              src="/images/Picture2.png"
              alt="Farmers using technology"
              width={600}
              height={450}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -bottom-4 left-0 right-0 h-16 bg-background transform skew-y-1"></div>
      <div className="absolute top-20 right-10 w-20 h-20 rounded-full bg-primary/10 blur-xl"></div>
      <div className="absolute bottom-40 left-10 w-32 h-32 rounded-full bg-secondary/10 blur-xl"></div>
    </section>
  );
} 