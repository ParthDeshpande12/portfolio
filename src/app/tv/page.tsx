// src/app/tv/page.tsx
'use client';

import { useEffect, useState } from 'react';
import TelevisionComponent from '@/components/TelevisionComponent';

export default function TVPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading TV Shows...</div>
      </div>
    );
  }

  return <TelevisionComponent />;
}