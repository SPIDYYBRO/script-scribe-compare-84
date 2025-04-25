
import React from 'react';
import { type EnhancedAnalysisData } from './types';

interface HandwritingSamplesProps {
  analysisData: EnhancedAnalysisData;
}

const HandwritingSamples = ({ analysisData }: HandwritingSamplesProps) => {
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
            <p className={`text-center text-lg font-${analysisData.comparisonTarget.toLowerCase().includes('times') ? 'times' : 
              analysisData.comparisonTarget.toLowerCase().includes('arial') ? 'arial' :
              analysisData.comparisonTarget.toLowerCase().includes('calibri') ? 'calibri' : 'helvetica'}`}>
              The quick brown fox jumps over the lazy dog
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HandwritingSamples;
