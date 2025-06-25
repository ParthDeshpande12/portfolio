// src/app/films/page.tsx
'use client';

import { useEffect, useState } from 'react';
import FilmsComponent from '@/components/FilmsComponent';

export default function FilmsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading Films...</div>
      </div>
    );
  }

  return (
    <div 
      className="bg-black text-white"
      style={{ 
        minHeight: '100vh', 
        overflow: 'visible',
        height: 'auto'
      }}
    >
      <FilmsComponent />
    </div>
  );
}