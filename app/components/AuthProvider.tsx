'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import for SessionProvider
const SessionProviderComponent = dynamic(
  () => import('next-auth/react').then(mod => ({ default: mod.SessionProvider })),
  { ssr: false }
);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProviderComponent>{children}</SessionProviderComponent>;
} 