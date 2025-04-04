import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-muted py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center">
          <Link href="/" className="mb-6 flex flex-col items-center">
            <Image 
              src="/logo.png" 
              alt="KrishiMitra AI Logo" 
              width={60} 
              height={60} 
              className="rounded-full"
            />
            <span className="mt-2 text-xl font-medium text-primary">KrishiMitra</span>
          </Link>
          
          <div className="mb-4 flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/farmer" className="text-foreground/80 hover:text-primary transition-colors">
              Farmers
            </Link>
            <Link href="/consumer" className="text-foreground/80 hover:text-primary transition-colors">
              Consumers
            </Link>
            <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground/80 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="mb-6 flex flex-wrap justify-center gap-4 text-sm">
            <a href="mailto:Krishimitra2@gmail.com" className="flex items-center text-foreground/80 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Krishimitra2@gmail.com
            </a>
            <a href="https://instagram.com/Krishimitra_2k25" target="_blank" rel="noopener noreferrer" className="flex items-center text-foreground/80 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round"></rect>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
              </svg>
              @Krishimitra_2k25
            </a>
          </div>
          
          <p className="text-sm text-foreground/60 text-center">
            &copy; {currentYear} KrishiMitra AI. All rights reserved.
          </p>
          <p className="text-xs text-foreground/60 mt-1 text-center">
            Empowering Smallholder Farmers with AI Technology
          </p>
        </div>
      </div>
    </footer>
  );
} 