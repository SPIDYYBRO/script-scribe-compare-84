
export interface EnhancedAnalysisData {
  comparisonTarget: string;
  date: Date;
  imageUrl: string;
  similarityScore: number;
  characterSpacing: number;
  lineConsistency: number;
  characterFormation: number;
  pressure: number;
  slant: number;
  details: Array<{
    character: string;
    similarityScore: number;
    notes: string;
  }>;
  strokeAnalysis: {
    quality: number;
    consistency: number;
    fluidity: number;
    direction: number;
    details: string[];
    strengths?: string[];
    weaknesses?: string[];
    recommendations?: string[];
  };
  gripAnalysis: {
    pressure: number;
    control: number;
    consistency: number;
    details: string[];
    strengths?: string[];
    weaknesses?: string[];
    recommendations?: string[];
  };
  baselineAnalysis: {
    stability: number;
    angle: number;
    consistency: number;
    drift: number;
    details: string[];
    strengths?: string[];
    weaknesses?: string[];
    recommendations?: string[];
  };
  spacingAnalysis: {
    letterSpacing: number;
    wordSpacing: number;
    lineSpacing: number;
    margins: number;
    details: string[];
    strengths?: string[];
    weaknesses?: string[];
    recommendations?: string[];
  };
  pressureAnalysis: {
    depth: number;
    consistency: number;
    variation: number;
    control: number;
    details: string[];
    strengths?: string[];
    weaknesses?: string[];
    recommendations?: string[];
  };
  formationAnalysis: {
    ascenders: {
      height: number;
      consistency: number;
      alignment: number;
      details: string[];
      strengths?: string[];
      weaknesses?: string[];
      recommendations?: string[];
    };
    descenders: {
      depth: number;
      consistency: number;
      alignment: number;
      details: string[];
      strengths?: string[];
      weaknesses?: string[];
      recommendations?: string[];
    };
    xHeight: {
      consistency: number;
      proportion: number;
      details: string[];
      strengths?: string[];
      weaknesses?: string[];
      recommendations?: string[];
    };
    slant: {
      angle: number;
      consistency: number;
      details: string[];
      strengths?: string[];
      weaknesses?: string[];
      recommendations?: string[];
    };
    letterShapes: {
      accuracy: number;
      consistency: number;
      distinctiveness: number;
      details: string[];
      strengths?: string[];
      weaknesses?: string[];
      recommendations?: string[];
    };
  };
  characterDetails: any;
  overallAssessment?: {
    strengths: string[];
    weaknesses: string[];
    priorities: string[];
    improvementPlan: string[];
  };
}
