'use client';

import { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import { useStore } from '@/store/useStore';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const loadFromLocalStorage = useStore((state) => state.loadFromLocalStorage);

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
