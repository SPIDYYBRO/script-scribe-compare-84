
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { type EnhancedAnalysisData } from './types';
import { Separator } from '@/components/ui/separator';

interface ImprovementPlanProps {
  analysisData: EnhancedAnalysisData;
}

const ImprovementPlan = ({ analysisData }: ImprovementPlanProps) => {
  // Calculate all metrics for prioritizing improvements
  const calculateMetrics = () => {
    const metrics = [
      { name: "Character Spacing", key: "characterSpacing", score: analysisData.spacingAnalysis.letterSpacing },
      { name: "Line Consistency", key: "lineConsistency", score: analysisData.baselineAnalysis.consistency },
      { name: "Character Formation", key: "characterFormation", score: analysisData.formationAnalysis.ascenders.consistency },
      { name: "Pressure Consistency", key: "pressure", score: analysisData.pressureAnalysis.consistency },
      { name: "Writing Slant", key: "slant", score: analysisData.formationAnalysis.slant?.angle || analysisData.baselineAnalysis.angle },
      { name: "Letter Shapes", key: "letterShapes", score: analysisData.formationAnalysis.letterShapes?.accuracy || 70 },
      { name: "X-Height Consistency", key: "xHeight", score: analysisData.formationAnalysis.xHeight?.consistency || 75 },
      { name: "Stroke Quality", key: "strokeQuality", score: analysisData.strokeAnalysis.quality },
      { name: "Grip Control", key: "gripControl", score: analysisData.gripAnalysis.control }
    ];
    
    return metrics.sort((a, b) => a.score - b.score);
  };

  const getImprovementTips = (category: string, score: number) => {
    const tips = {
      characterSpacing: {
        low: "Practice maintaining consistent spacing between letters. Use lined paper with grid markings to guide your spacing.",
        medium: "Your character spacing is improving! Continue practicing with consistent letter widths and pay attention to kerning pairs.",
        high: "Excellent spacing! To perfect it further, focus on problematic letter combinations like 'rn' vs 'm'."
      },
      lineConsistency: {
        low: "Use lined paper and practice writing in a straight line. Try to keep your text from slanting upward or downward.",
        medium: "Your line consistency is getting better. Try placing a ruler or straight edge below each line as you write to maintain straightness.",
        high: "Great line consistency! For perfection, practice writing on unlined paper while maintaining the same baseline."
      },
      characterFormation: {
        low: "Practice drawing each letter slowly and deliberately. Study exemplars of each letter and try to match their form.",
        medium: "Your letter formations are developing well. Focus on consistency in loops, ascenders, and descenders.",
        high: "Excellent character formation! To perfect it, focus on the subtle details like serifs and letter terminations."
      },
      pressure: {
        low: "Try to maintain even pressure throughout your writing. Practice with different pen types to find what works best for your style.",
        medium: "Your pressure consistency is improving. Practice transitioning between thin and thick strokes if using a pressure-sensitive pen.",
        high: "Great pressure control! To perfect it, practice calligraphic techniques that require varied pressure."
      },
      slant: {
        low: "Choose a slant angle (forward, vertical, or backward) and practice maintaining it consistently across all letters.",
        medium: "Your slant consistency is improving. Draw slant lines on your practice paper as guides.",
        high: "Excellent slant consistency! Try varying your slant intentionally to develop different writing styles."
      },
      letterShapes: {
        low: "Focus on forming each letter correctly. Practice problem letters individually until muscle memory develops.",
        medium: "Your letter shapes are improving. Work on maintaining consistency when the same letter appears multiple times.",
        high: "Great letter formations! To perfect them, work on the fine details that distinguish similar letters."
      },
      xHeight: {
        low: "Practice maintaining consistent height for lowercase letters. Use guideline paper with a defined x-height zone.",
        medium: "Your x-height consistency is improving. Pay attention to rounded letters which often appear smaller.",
        high: "Excellent x-height control! For perfection, ensure consistent proportion between x-height and ascenders/descenders."
      },
      strokeQuality: {
        low: "Work on fluid, smooth strokes by practicing basic calligraphy movements. Loosen your grip slightly.",
        medium: "Your stroke quality is improving. Focus on maintaining consistent speed and pressure throughout each stroke.",
        high: "Excellent stroke quality! For perfection, work on transitions between strokes to create seamless connections."
      },
      gripControl: {
        low: "Adjust your pen grip to a relaxed tripod position (thumb, index, middle finger). Practice holding the pen looser.",
        medium: "Your grip is improving. Try different pen grips or cushions to find the most comfortable position.",
        high: "Great grip control! To perfect it, work on maintaining the same grip position during extended writing sessions."
      }
    };
    
    const level = score < 60 ? "low" : score < 80 ? "medium" : "high";
    return tips[category as keyof typeof tips][level as keyof typeof tips[keyof typeof tips]];
  };

  const metrics = calculateMetrics();
  const priorityAreas = metrics.slice(0, 3); // Top 3 weakest areas
  
  // Get improvement strengths and weaknesses
  const strengths = analysisData.overallAssessment?.strengths || [
    "Good baseline consistency on lined paper",
    "Clearly formed letter shapes with personal style",
    "Appropriate spacing between words enhancing readability"
  ];
  
  const weaknesses = analysisData.overallAssessment?.weaknesses || [
    "Variable pressure control affecting consistency",
    "Inconsistent slant angle throughout longer texts",
    "Letter spacing issues with certain character combinations"
  ];

  const improvementPlan = analysisData.overallAssessment?.improvementPlan || [
    "Use slant guides for 10 minutes daily to establish muscle memory",
    "Practice with pressure-sensitive pens to develop better control",
    "Implement daily drills focusing on maintaining consistent x-height"
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <span>Comprehensive Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Strengths
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-sm">
                {strengths.map((strength, i) => (
                  <li key={i} className="leading-relaxed">{strength}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                Areas Needing Improvement
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-sm">
                {weaknesses.map((weakness, i) => (
                  <li key={i} className="leading-relaxed">{weakness}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div>
            <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              Priority Focus Areas
            </h3>
            {priorityAreas.map((area, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-medium">{area.name}</h4>
                  <span className={`text-sm px-2 py-0.5 rounded-full ${
                    area.score < 50 ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {area.score < 50 ? "Needs Attention" : "Improving"}
                  </span>
                </div>
                <Progress value={area.score} className="h-2 mb-2" />
                <Alert className="bg-blue-50 border-blue-100">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-sm">
                    <strong>Tip:</strong> {getImprovementTips(area.key, area.score)}
                  </AlertDescription>
                </Alert>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-green-500" />
            <span>Personalized Improvement Plan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-semibold mb-3">4-Week Practice Schedule</h3>
              <div className="bg-muted rounded-md p-4">
                <ol className="list-decimal pl-5 space-y-4 text-sm">
                  <li>
                    <strong>Week 1: Stroke and Grip Foundations</strong>
                    <p className="mt-1 text-muted-foreground">Focus on basic stroke exercises and establishing a comfortable grip. Practice for 15 minutes daily with an emphasis on smooth, consistent lines.</p>
                  </li>
                  <li>
                    <strong>Week 2: Baseline and Spacing Consistency</strong>
                    <p className="mt-1 text-muted-foreground">Use lined paper to practice maintaining even baseline alignment and consistent letter spacing. Practice writing the same words multiple times with increasing consistency.</p>
                  </li>
                  <li>
                    <strong>Week 3: Letter Formation and Proportions</strong>
                    <p className="mt-1 text-muted-foreground">Work on problematic letter forms identified in your analysis. Focus on maintaining consistent x-height and proper ascender/descender proportions.</p>
                  </li>
                  <li>
                    <strong>Week 4: Fluid Writing and Integration</strong>
                    <p className="mt-1 text-muted-foreground">Practice writing full sentences and paragraphs, applying all previously learned skills. Focus on maintaining quality while gradually increasing writing speed.</p>
                  </li>
                </ol>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-semibold mb-3">Daily Practice Routine (15-20 min)</h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>Warm up with basic strokes (5 minutes): Practice straight lines, curves, and loops.</li>
                <li>Letter formation (5 minutes): Focus on the letters identified as needing improvement.</li>
                <li>Word practice (5 minutes): Write common words that include your challenging letters.</li>
                <li>Sentence practice (5 minutes): Write a sentence containing all letters of the alphabet.</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-md font-semibold mb-3">Specific Exercises</h3>
              <ul className="list-disc pl-5 space-y-3 text-sm">
                {improvementPlan.map((plan, i) => (
                  <li key={i} className="leading-relaxed">{plan}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-md font-semibold mb-3">Recommended Resources</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Use lined paper with guidelines for consistent letter height and spacing</li>
                <li>Try different pen types to find what works best for your writing style</li>
                <li>Consider using a light box or tracing paper for initial practice</li>
                <li>Record your progress by saving dated samples of your handwriting</li>
                <li>Practice with writing workbooks designed for handwriting improvement</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImprovementPlan;
