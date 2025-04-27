
import React from 'react';
import { type EnhancedAnalysisData } from './types';
import DetailedAnalysisCard from './DetailedAnalysisCard';
import { ArrowUp, ArrowDown, Ruler, Italic, PenTool } from "lucide-react";

interface FormationAnalysisProps {
  formationAnalysis: EnhancedAnalysisData['formationAnalysis'];
}

const FormationAnalysis = ({ formationAnalysis }: FormationAnalysisProps) => {
  return (
    <div className="space-y-8">
      <DetailedAnalysisCard 
        title="Ascenders" 
        icon={<ArrowUp className="h-5 w-5" />}
        metrics={{
          height: formationAnalysis.ascenders.height,
          consistency: formationAnalysis.ascenders.consistency,
          alignment: formationAnalysis.ascenders.alignment
        }}
        details={formationAnalysis.ascenders.details}
        strengths={formationAnalysis.ascenders.strengths}
        weaknesses={formationAnalysis.ascenders.weaknesses}
        recommendations={formationAnalysis.ascenders.recommendations}
      />
      
      <DetailedAnalysisCard 
        title="Descenders" 
        icon={<ArrowDown className="h-5 w-5" />}
        metrics={{
          depth: formationAnalysis.descenders.depth,
          consistency: formationAnalysis.descenders.consistency,
          alignment: formationAnalysis.descenders.alignment
        }}
        details={formationAnalysis.descenders.details}
        strengths={formationAnalysis.descenders.strengths}
        weaknesses={formationAnalysis.descenders.weaknesses}
        recommendations={formationAnalysis.descenders.recommendations}
      />
      
      <DetailedAnalysisCard 
        title="X-Height" 
        icon={<Ruler className="h-5 w-5" />}
        metrics={{
          consistency: formationAnalysis.xHeight.consistency,
          proportion: formationAnalysis.xHeight.proportion
        }}
        details={formationAnalysis.xHeight.details}
        strengths={formationAnalysis.xHeight.strengths}
        weaknesses={formationAnalysis.xHeight.weaknesses}
        recommendations={formationAnalysis.xHeight.recommendations}
      />
      
      <DetailedAnalysisCard 
        title="Slant" 
        icon={<Italic className="h-5 w-5" />}
        metrics={{
          angle: formationAnalysis.slant.angle,
          consistency: formationAnalysis.slant.consistency
        }}
        details={formationAnalysis.slant.details}
        strengths={formationAnalysis.slant.strengths}
        weaknesses={formationAnalysis.slant.weaknesses}
        recommendations={formationAnalysis.slant.recommendations}
      />
      
      <DetailedAnalysisCard 
        title="Letter Shapes" 
        icon={<PenTool className="h-5 w-5" />}
        metrics={{
          accuracy: formationAnalysis.letterShapes.accuracy,
          consistency: formationAnalysis.letterShapes.consistency,
          distinctiveness: formationAnalysis.letterShapes.distinctiveness
        }}
        details={formationAnalysis.letterShapes.details}
        strengths={formationAnalysis.letterShapes.strengths}
        weaknesses={formationAnalysis.letterShapes.weaknesses}
        recommendations={formationAnalysis.letterShapes.recommendations}
      />
    </div>
  );
};

export default FormationAnalysis;
