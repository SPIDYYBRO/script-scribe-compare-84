
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
  strokeAnalysis: any;
  gripAnalysis: any;
  baselineAnalysis: any;
  spacingAnalysis: any;
  pressureAnalysis: any;
  formationAnalysis: any;
  characterDetails: any;
}
