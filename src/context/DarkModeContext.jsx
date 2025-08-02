import React, { createContext, useContext, useEffect } from 'react';

export const DarkModeContext = createContext();

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

export const DarkModeProvider = ({ children }) => {
  // Always use dark mode
  const isDarkMode = true;

  useEffect(() => {
    // Apply dark mode on initial load
    const root = document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <DarkModeContext.Provider value={{ 
      isDarkMode
    }}>
      {children}
    </DarkModeContext.Provider>
  );
};