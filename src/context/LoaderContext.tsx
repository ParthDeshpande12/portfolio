"use client";

import { createContext, useContext, useState } from "react";

interface LoaderContextType {
  loaderShown: boolean;
  setLoaderShown: (shown: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loaderShown, setLoaderShown] = useState(true);
  return (
    <LoaderContext.Provider value={{ loaderShown, setLoaderShown }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoaderContext() {
  const context = useContext(LoaderContext);
  if (!context) throw new Error("useLoaderContext must be used within LoaderProvider");
  return context;
}
