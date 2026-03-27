"use client";

import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
