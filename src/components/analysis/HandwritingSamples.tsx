
import React from 'react';
import { type EnhancedAnalysisData } from './types';

interface HandwritingSamplesProps {
  analysisData: EnhancedAnalysisData;
}

const HandwritingSamples = ({ analysisData }: HandwritingSamplesProps) => {
  const getFontClass = (target: string) => {
    const targetLower = target.toLowerCase();
    if (targetLower.includes('times')) return 'font-times';
    if (targetLower.includes('arial')) return 'font-arial';
    if (targetLower.includes('calibri')) return 'font-calibri';
    if (targetLower.includes('helvetica')) return 'font-helvetica';
    if (targetLower.includes('lucida')) return 'font-lucida';
    return '';
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8">
      <div className="w-full md:w-1/2">
        <h3 className="text-lg font-medium mb-2">Your Handwriting Sample</h3>
        <div className="bg-muted rounded-md overflow-hidden">
          <img 
            src={analysisData.imageUrl} 
            alt="Your handwriting sample" 
            className="w-full h-auto object-contain max-h-[300px]"
          />
        </div>
      </div>
      
      <div className="w-full md:w-1/2">
        <h3 className="text-lg font-medium mb-2">Compared with {analysisData.comparisonTarget}</h3>
        <div className="bg-muted rounded-md h-[300px] flex items-center justify-center p-4">
          {analysisData.comparisonTarget === "Custom Image" ? (
            <p className="text-muted-foreground">Custom comparison image</p>
          ) : (
            <p className={`text-center text-lg ${getFontClass(analysisData.comparisonTarget)}`}>
              The quick brown fox jumps over the lazy dog
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HandwritingSamples;
