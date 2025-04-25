// Handwriting analysis utility functions

export const analyzeHandwriting = (handwritingSample: string, comparisonType: string, comparisonSample?: string, comparisonFont?: string) => {
  // Generate consistent but pseudo-random scores based on inputs
  const generateScore = (base: number, variance: number) => {
    const seed = handwritingSample.length + (comparisonSample?.length || 0) + (comparisonFont?.length || 0);
    const pseudoRandom = Math.sin(seed) * 10000;
    return Math.min(100, Math.max(0, Math.floor(base + (pseudoRandom % variance))));
  };

  // Primary Analysis Categories
  const strokeAnalysis = {
    quality: generateScore(75, 25),
    consistency: generateScore(70, 30),
    fluidity: generateScore(65, 35),
    direction: generateScore(80, 20),
    details: [
      "Stroke formation shows " + (generateScore(70, 30) > 65 ? "confident" : "hesitant") + " pen movement",
      "Line quality is " + (generateScore(75, 25) > 70 ? "smooth and controlled" : "somewhat irregular"),
      "Stroke direction maintains " + (generateScore(80, 20) > 75 ? "consistent" : "variable") + " patterns"
    ]
  };

  const gripAnalysis = {
    pressure: generateScore(70, 30),
    control: generateScore(75, 25),
    consistency: generateScore(65, 35),
    details: [
      "Grip pressure indicates " + (generateScore(70, 30) > 65 ? "relaxed" : "tense") + " hand position",
      "Pen control shows " + (generateScore(75, 25) > 70 ? "steady" : "variable") + " handling",
      "Writing rhythm appears " + (generateScore(65, 35) > 60 ? "natural" : "forced")
    ]
  };

  const baselineAnalysis = {
    stability: generateScore(70, 30),
    angle: generateScore(75, 25),
    consistency: generateScore(80, 20),
    drift: generateScore(65, 35),
    details: [
      "Baseline " + (generateScore(70, 30) > 65 ? "maintains" : "varies in") + " horizontal alignment",
      "Writing angle shows " + (generateScore(75, 25) > 70 ? "consistent" : "variable") + " slant",
      "Line spacing demonstrates " + (generateScore(80, 20) > 75 ? "good" : "irregular") + " control"
    ]
  };

  const spacingAnalysis = {
    letterSpacing: generateScore(75, 25),
    wordSpacing: generateScore(70, 30),
    lineSpacing: generateScore(65, 35),
    margins: generateScore(80, 20),
    details: [
      "Letter spacing shows " + (generateScore(75, 25) > 70 ? "balanced" : "irregular") + " distribution",
      "Word spacing maintains " + (generateScore(70, 30) > 65 ? "consistent" : "variable") + " gaps",
      "Margin alignment is " + (generateScore(80, 20) > 75 ? "well-maintained" : "inconsistent")
    ]
  };

  const pressureAnalysis = {
    depth: generateScore(70, 30),
    consistency: generateScore(75, 25),
    variation: generateScore(65, 35),
    control: generateScore(80, 20),
    details: [
      "Writing pressure shows " + (generateScore(70, 30) > 65 ? "controlled" : "excessive") + " force",
      "Pressure consistency is " + (generateScore(75, 25) > 70 ? "well-maintained" : "variable"),
      "Stroke weight appears " + (generateScore(65, 35) > 60 ? "balanced" : "inconsistent")
    ]
  };

  const formationAnalysis = {
    ascenders: {
      height: generateScore(75, 25),
      consistency: generateScore(70, 30),
      alignment: generateScore(65, 35),
      details: [
        "Ascender height shows " + (generateScore(75, 25) > 70 ? "consistent" : "variable") + " proportion",
        "Vertical alignment is " + (generateScore(70, 30) > 65 ? "well-maintained" : "irregular")
      ]
    },
    descenders: {
      depth: generateScore(70, 30),
      consistency: generateScore(75, 25),
      alignment: generateScore(80, 20),
      details: [
        "Descender depth maintains " + (generateScore(70, 30) > 65 ? "uniform" : "varying") + " length",
        "Lower alignment shows " + (generateScore(75, 25) > 70 ? "good" : "inconsistent") + " control"
      ]
    }
  };

  // Generate character-specific analysis
  const letters = ['a', 'e', 't', 'r', 's', 'o', 'n', 'i', 'l', 'h', 'g', 'd', 'p', 'q', 'b', 'u', 'm', 'w', 'y', 'v'];
  const details = letters.slice(0, 10 + (Math.abs(Math.sin(handwritingSample.length)) * 10)).map(letter => {
    const score = generateScore(60, 40);
    return {
      character: letter,
      similarityScore: score,
      strokeQuality: generateScore(65, 35),
      pressureControl: generateScore(70, 30),
      formationAccuracy: generateScore(75, 25),
      notes: generateDetailedNotes(letter, score)
    };
  });

  return {
    strokeAnalysis,
    gripAnalysis,
    baselineAnalysis,
    spacingAnalysis,
    pressureAnalysis,
    formationAnalysis,
    characterDetails: details.sort((a, b) => a.character.localeCompare(b.character))
  };
};

// Helper function to generate detailed notes for each character
const generateDetailedNotes = (letter: string, score: number) => {
  const qualityLevel = score >= 80 ? "excellent" : score >= 60 ? "good" : "needs improvement";
  const specificFeature = ['a', 'e', 'o'].includes(letter) ? 'bowl formation' :
    ['t', 'f'].includes(letter) ? 'crossbar placement' :
    ['g', 'j', 'y', 'p', 'q'].includes(letter) ? 'descender formation' :
    ['b', 'd', 'h', 'k', 'l'].includes(letter) ? 'ascender structure' :
    'basic structure';

  return `${qualityLevel.charAt(0).toUpperCase() + qualityLevel.slice(1)} ${specificFeature}. ${
    score >= 80 ? `Shows precise control and consistency in formation.` :
    score >= 60 ? `Shows adequate control with room for refinement.` :
    `Requires focus on maintaining consistent form and stroke direction.`
  }`;
};

// Generate a unique ID for analysis records
export const generateAnalysisId = () => {
  return 'analysis-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};
