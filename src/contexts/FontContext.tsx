
import React, { createContext, useState, useContext, useEffect } from 'react';

export type FontChoice = 'times' | 'arial' | 'calibri' | 'helvetica';

interface FontContextType {
  font: FontChoice;
  setFont: (font: FontChoice) => void;
  fontName: string; // Readable font name for display
}

const FontContext = createContext<FontContextType | undefined>(undefined);

const fontNames = {
  times: 'Times New Roman',
  arial: 'Arial',
  calibri: 'Calibri',
  helvetica: 'Helvetica'
};

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFont] = useState<FontChoice>('times'); // Default is Times New Roman as per requirements
  const [fontName, setFontName] = useState<string>(fontNames.times);

  useEffect(() => {
    // Check local storage for saved font preference
    const savedFont = localStorage.getItem('script-check-font') as FontChoice | null;
    if (savedFont && Object.keys(fontNames).includes(savedFont)) {
      setFont(savedFont);
      setFontName(fontNames[savedFont as keyof typeof fontNames]);
    }
  }, []);

  const handleSetFont = (newFont: FontChoice) => {
    setFont(newFont);
    setFontName(fontNames[newFont]);
    localStorage.setItem('script-check-font', newFont);
  };

  return (
    <FontContext.Provider value={{ font, setFont: handleSetFont, fontName }}>
      {children}
    </FontContext.Provider>
  );
}

export const useFont = () => {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
