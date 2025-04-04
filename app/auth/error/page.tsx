'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorType, setErrorType] = useState<string>('');
  
  useEffect(() => {
    const error = searchParams.get('error');
    
    if (error === 'Configuration') {
      setErrorType('Configuration Error');
      setErrorMessage('There is a problem with the server configuration. Please contact support.');
    } else if (error === 'AccessDenied') {
      setErrorType('Access Denied');
      setErrorMessage('You do not have permission to sign in.');
    } else if (error === 'OAuthSignin') {
      setErrorType('OAuth Sign In Error');
      setErrorMessage('Error in the OAuth sign-in process. Please try again.');
    } else if (error === 'OAuthCallback') {
      setErrorType('OAuth Callback Error');
      setErrorMessage('Error in the OAuth callback process. This may be due to misconfigured credentials.');
    } else if (error === 'OAuthCreateAccount') {
      setErrorType('Account Creation Failed');
      setErrorMessage('Could not create a user account. Please try again later.');
    } else if (error === 'EmailCreateAccount') {
      setErrorType('Email Sign Up Failed');
      setErrorMessage('Could not create account using email provider.');
    } else if (error === 'Callback') {
      setErrorType('Callback Error');
      setErrorMessage('Error in the authentication callback. Please try again.');
    } else if (error === 'OAuthAccountNotLinked') {
      setErrorType('Account Not Linked');
      setErrorMessage('This email is already associated with another account using a different sign-in method.');
    } else if (error === 'EmailSignin') {
      setErrorType('Email Sign In Failed');
      setErrorMessage('The email sign-in link is invalid or has expired.');
    } else if (error === 'CredentialsSignin') {
      setErrorType('Invalid Credentials');
      setErrorMessage('The sign in credentials are invalid.');
    } else {
      setErrorType('Authentication Error');
      setErrorMessage('An unknown error occurred during authentication. Please try again later.');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-background border border-red-200 rounded-xl p-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 rounded-full p-4 mb-6">
                <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold mb-2 text-red-600">{errorType}</h1>
              
              <p className="text-foreground/80 mb-6">
                {errorMessage}
              </p>
              
              <div className="space-y-4 w-full">
                <Link href="/auth/signin" className="block w-full bg-primary text-white font-medium py-2 px-4 rounded-md text-center hover:bg-primary/90 transition-colors">
                  Try Again
                </Link>
                
                <Link href="/" className="block w-full bg-foreground/10 text-foreground font-medium py-2 px-4 rounded-md text-center hover:bg-foreground/20 transition-colors">
                  Go to Homepage
                </Link>
              </div>
              
              <div className="mt-8 pt-6 border-t border-foreground/10 w-full">
                <h2 className="font-semibold mb-4 text-left">Troubleshooting Tips:</h2>
                <ul className="text-left text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Clear your browser cookies and cache</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Make sure you're using a valid email address</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Try signing in with a different browser</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>If problems persist, contact our support team</span>
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