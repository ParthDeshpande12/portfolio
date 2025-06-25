'use client';

import { useEffect, useState } from 'react';
import BioEdgePage from '@/components/BioEdgePage';

export default function ExtraPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading Extra Content...</div>
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
      <BioEdgePage />
    </div>
  );
}