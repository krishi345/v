import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Key Challenges Addressed</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Unpredictable Weather & Climate Change</h4>
                  <p className="text-foreground/80">Causes significant crop losses annually.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Pests, Diseases & Weeds</h4>
                  <p className="text-foreground/80">Major contributors to yield reduction.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Limited Access to Technology</h4>
                  <p className="text-foreground/80">Many farmers lack access to modern tools and insights.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Alignment with UN SDGs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-accent/5 rounded-lg">
                <div className="text-xl font-bold text-primary mb-2">SDG 2</div>
                <div className="text-center">Zero Hunger</div>
              </div>
              <div className="flex flex-col items-center p-4 bg-accent/5 rounded-lg">
                <div className="text-xl font-bold text-primary mb-2">SDG 9</div>
                <div className="text-center">Industry, Innovation, and Infrastructure</div>
              </div>
              <div className="flex flex-col items-center p-4 bg-accent/5 rounded-lg">
                <div className="text-xl font-bold text-primary mb-2">SDG 13</div>
                <div className="text-center">Climate Action</div>
              </div>
              <div className="flex flex-col items-center p-4 bg-accent/5 rounded-lg">
                <div className="text-xl font-bold text-primary mb-2">SDG 15</div>
                <div className="text-center">Life on Land</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-col items-center p-4 bg-accent/5 rounded-lg">
                <div className="text-xl font-bold text-primary mb-2">SDG 17</div>
                <div className="text-center">Partnerships for the Goals</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 