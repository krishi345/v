'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

export default function SignOut() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-background border border-primary/20 rounded-xl p-8 shadow-sm text-center">
            <svg className="h-16 w-16 text-primary/80 mx-auto mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            
            <h1 className="text-3xl font-bold mb-4">Sign Out</h1>
            <p className="text-foreground/70 mb-8">
              Are you sure you want to sign out of your KrishiMitra account?
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleCancel}
                className="flex-1 bg-foreground/10 text-foreground font-medium py-3 px-4 rounded-md hover:bg-foreground/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                disabled={isLoading}
                className="flex-1 bg-primary text-white font-medium py-3 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing Out...
                  </span>
                ) : (
                  'Sign Out'
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 