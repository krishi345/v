'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/profile');
    }
  }, [status, router]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse space-y-6">
                <div className="h-8 bg-foreground/10 rounded w-1/3"></div>
                <div className="h-64 bg-foreground/10 rounded"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-foreground/10 rounded w-3/4"></div>
                  <div className="h-6 bg-foreground/10 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!session) {
    return null; // Return null as useEffect will redirect
  }

  const mockRecommendations = [
    {
      type: 'crop',
      date: '2023-04-15',
      content: 'Rice, Wheat, Cotton',
      link: '/crop-recommendation'
    },
    {
      type: 'disease',
      date: '2023-04-10',
      content: 'Late Blight detected in Tomato plants',
      link: '/disease-detection'
    },
    {
      type: 'fertilizer',
      date: '2023-04-05',
      content: 'Nitrogen-rich Fertilizer recommended',
      link: '/fertilizer-recommendation'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">My Profile</h1>
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center"
              >
                {isSigningOut ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing Out...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-background border border-primary/20 rounded-xl p-6 md:p-8 shadow-sm mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0">
                  {session.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt={session.user.name || 'User'} 
                      width={100} 
                      height={100} 
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                      {session.user?.name?.[0] || 'U'}
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold">{session.user?.name || 'User'}</h2>
                  <p className="text-foreground/70">{session.user?.email || ''}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary py-1 px-3 rounded-full text-sm font-medium">
                      Verified Account
                    </span>
                    <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm font-medium">
                      Active Member
                    </span>
                  </div>
                </div>
                <Link 
                  href="/profile/edit"
                  className="bg-foreground/10 hover:bg-foreground/20 text-foreground py-2 px-4 rounded-md text-sm font-medium transition-colors"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background border border-foreground/10 rounded-xl p-6 text-center">
                <h3 className="font-medium text-foreground/70 mb-1">Recommendations</h3>
                <p className="text-2xl font-bold">{mockRecommendations.length}</p>
              </div>
              <div className="bg-background border border-foreground/10 rounded-xl p-6 text-center">
                <h3 className="font-medium text-foreground/70 mb-1">Saved Items</h3>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="bg-background border border-foreground/10 rounded-xl p-6 text-center">
                <h3 className="font-medium text-foreground/70 mb-1">Alerts</h3>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Recent Recommendations</h2>
            <div className="bg-background border border-primary/20 rounded-xl shadow-sm overflow-hidden">
              <ul className="divide-y divide-foreground/10">
                {mockRecommendations.map((rec, index) => (
                  <li key={index} className="p-4 md:p-6 hover:bg-foreground/5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            rec.type === 'crop' 
                              ? 'bg-blue-100 text-blue-800' 
                              : rec.type === 'disease'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {rec.type.charAt(0).toUpperCase() + rec.type.slice(1)}
                          </span>
                          <span className="text-sm text-foreground/60">{rec.date}</span>
                        </div>
                        <p className="font-medium">{rec.content}</p>
                      </div>
                      <Link
                        href={rec.link}
                        className="text-primary hover:text-primary/80 font-medium text-sm flex items-center"
                      >
                        View Details
                        <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="bg-foreground/5 px-6 py-4 text-center">
                <Link 
                  href="/recommendations"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  View All Recommendations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 