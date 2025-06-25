// src/app/ads/page.tsx
'use client';

import { useEffect, useState } from 'react';
import AdsComponent from '@/components/AdsComponent';

export default function AdsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading Advertisements...</div>
      </div>
    );
  }

  return <AdsComponent />;
}