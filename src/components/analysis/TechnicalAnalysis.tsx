
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

  // Calculate overall technical score
  const calculateOverallScore = () => {
    const scores = [
      strokeAnalysis.quality,
      gripAnalysis.control,
      baselineAnalysis.stability,
      spacingAnalysis.letterSpacing,
      pressureAnalysis.consistency
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const overallScore = calculateOverallScore();

  return (
    <div className="space-y-6">
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Overall Technical Score</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            overallScore >= 80 ? "bg-green-100 text-green-800" :
            overallScore >= 60 ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800"
          }`}>
            {overallScore}%
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {overallScore >= 80 ? "Excellent technical control across all aspects." :
           overallScore >= 60 ? "Good foundation with room for improvement in specific areas." :
           "Focus needed on fundamental writing techniques."}
        </p>
      </div>

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
