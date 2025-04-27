
import React from 'react';
import { type EnhancedAnalysisData } from './types';
import DetailedAnalysisCard from './DetailedAnalysisCard';
import { Pen, Grip, Baseline, Square, Ruler } from "lucide-react";

interface TechnicalAnalysisProps {
  analysisData: EnhancedAnalysisData;
}

const TechnicalAnalysis = ({ analysisData }: TechnicalAnalysisProps) => {
  // Extract all the required data and metrics from analysisData
  const { strokeAnalysis, gripAnalysis, baselineAnalysis, spacingAnalysis, pressureAnalysis } = analysisData;

  return (
    <div className="space-y-6">
      <DetailedAnalysisCard 
        title="Stroke Analysis" 
        icon={<Pen className="h-5 w-5" />}
        metrics={{
          quality: strokeAnalysis.quality,
          consistency: strokeAnalysis.consistency,
          fluidity: strokeAnalysis.fluidity,
          direction: strokeAnalysis.direction
        }}
        details={strokeAnalysis.details}
        strengths={strokeAnalysis.strengths}
        weaknesses={strokeAnalysis.weaknesses}
        recommendations={strokeAnalysis.recommendations}
      />
      
      <DetailedAnalysisCard 
        title="Grip Analysis" 
        icon={<Grip className="h-5 w-5" />}
        metrics={{
          pressure: gripAnalysis.pressure,
          control: gripAnalysis.control,
          consistency: gripAnalysis.consistency
        }}
        details={gripAnalysis.details}
        strengths={gripAnalysis.strengths}
        weaknesses={gripAnalysis.weaknesses}
        recommendations={gripAnalysis.recommendations}
      />
      
      <DetailedAnalysisCard 
        title="Baseline Analysis" 
        icon={<Baseline className="h-5 w-5" />}
        metrics={{
          stability: baselineAnalysis.stability,
          angle: baselineAnalysis.angle,
          consistency: baselineAnalysis.consistency,
          drift: baselineAnalysis.drift
        }}
        details={baselineAnalysis.details}
        strengths={baselineAnalysis.strengths}
        weaknesses={baselineAnalysis.weaknesses}
        recommendations={baselineAnalysis.recommendations}
      />
      
      <DetailedAnalysisCard 
        title="Spacing Analysis" 
        icon={<Square className="h-5 w-5" />}
        metrics={{
          letterSpacing: spacingAnalysis.letterSpacing,
          wordSpacing: spacingAnalysis.wordSpacing,
          lineSpacing: spacingAnalysis.lineSpacing,
          margins: spacingAnalysis.margins
        }}
        details={spacingAnalysis.details}
        strengths={spacingAnalysis.strengths}
        weaknesses={spacingAnalysis.weaknesses}
        recommendations={spacingAnalysis.recommendations}
      />
      
      <DetailedAnalysisCard 
        title="Pressure Analysis" 
        icon={<Ruler className="h-5 w-5" />}
        metrics={{
          depth: pressureAnalysis.depth,
          consistency: pressureAnalysis.consistency,
          variation: pressureAnalysis.variation,
          control: pressureAnalysis.control
        }}
        details={pressureAnalysis.details}
        strengths={pressureAnalysis.strengths}
        weaknesses={pressureAnalysis.weaknesses}
        recommendations={pressureAnalysis.recommendations}
      />
    </div>
  );
};

export default TechnicalAnalysis;
