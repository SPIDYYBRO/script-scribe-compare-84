
// Handwriting analysis utility functions

export const analyzeHandwriting = (handwritingSample: string, comparisonType: string, comparisonSample?: string, comparisonFont?: string) => {
  // Generate consistent but pseudo-random scores based on inputs
  const generateScore = (base: number, variance: number) => {
    const seed = handwritingSample.length + (comparisonSample?.length || 0) + (comparisonFont?.length || 0);
    const pseudoRandom = Math.sin(seed) * 10000;
    return Math.min(100, Math.max(0, Math.floor(base + (pseudoRandom % variance))));
  };

  // Calculate the overall similarity score
  const overallSimilarityScore = generateScore(70, 30);

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
    ],
    strengths: [
      "Good control at the start of strokes",
      "Maintains consistent pressure throughout longer strokes",
      "Clean line endings with minimal tapering issues"
    ],
    weaknesses: [
      "Occasional hesitation marks at stroke junctions",
      "Some strokes show tremor when creating curves",
      "Inconsistent stroke weight between uppercase and lowercase letters"
    ],
    recommendations: [
      "Practice fluid motion exercises focusing on continuous curved lines",
      "Use guidelines to maintain consistent stroke direction",
      "Try using different pen types to find the optimal tool for your writing style"
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
    ],
    strengths: [
      "Maintains comfortable grip through extended writing",
      "Good finger positioning allows for flexible movements",
      "Balanced pressure distribution across the pen"
    ],
    weaknesses: [
      "Occasional tensing of grip during complex letter formations",
      "Grip position shifts slightly when transitioning between words",
      "Tendency to hold pen too close to the tip, limiting fluidity"
    ],
    recommendations: [
      "Practice writing with a relaxed grip using the tripod method (thumb, index and middle finger)",
      "Use ergonomic pen grips to encourage proper finger placement",
      "Take short breaks during extended writing sessions to prevent grip fatigue"
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
    ],
    strengths: [
      "Maintains horizontal alignment across most of the page",
      "Text rarely drifts above or below the baseline",
      "Consistent baseline when using lined paper"
    ],
    weaknesses: [
      "Baseline tends to drift upward toward the end of longer lines",
      "Some lines begin at different heights, affecting overall consistency",
      "Baseline stability decreases when writing quickly"
    ],
    recommendations: [
      "Practice writing on lined paper with clear baseline guides",
      "Place a ruler beneath the current line while writing to maintain straightness",
      "Focus on maintaining eye position at a consistent distance from the paper"
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
    ],
    strengths: [
      "Consistent spacing between similar letter pairs",
      "Good visual rhythm established through regular word spacing",
      "Maintains appropriate margins consistently on one side of the page"
    ],
    weaknesses: [
      "Some letter combinations (like 'rn', 'nn') lack sufficient spacing clarity",
      "Word spacing tends to compress toward the end of lines",
      "Right margin consistency varies significantly throughout the document"
    ],
    recommendations: [
      "Practice with dotted guideline paper that includes letter-width markings",
      "Use finger-width spacing as a guide between words",
      "Draw margin lines before writing to establish clear boundaries"
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
    ],
    strengths: [
      "Maintains readable impressions without page indentation",
      "Shows good pressure control on downward strokes",
      "Demonstrates appropriate pressure variation for different letter parts"
    ],
    weaknesses: [
      "Occasional excessive pressure on initial strokes of words",
      "Pressure inconsistency when forming connecting loops",
      "Reduced pressure control when writing for extended periods"
    ],
    recommendations: [
      "Practice with pressure-sensitive pens to build awareness",
      "Experiment with different writing surfaces to find optimal feedback",
      "Use breathing techniques to reduce tension when writing"
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
      ],
      strengths: [
        "Maintains proportional ascender heights for most letters",
        "Good vertical alignment of tall letters across words",
        "Clear distinction between ascender-containing letters and x-height letters"
      ],
      weaknesses: [
        "Inconsistent height ratio between different ascender letters (like l vs h)",
        "Some ascenders lean or curve at their peaks",
        "Occasional merging of ascenders in closely-spaced words"
      ],
      recommendations: [
        "Practice with four-lined guideline paper to establish consistent heights",
        "Focus on keeping ascenders parallel to each other",
        "Use tracing exercises to develop muscle memory for proper proportions"
      ]
    },
    descenders: {
      depth: generateScore(70, 30),
      consistency: generateScore(75, 25),
      alignment: generateScore(80, 20),
      details: [
        "Descender depth maintains " + (generateScore(70, 30) > 65 ? "uniform" : "varying") + " length",
        "Lower alignment shows " + (generateScore(75, 25) > 70 ? "good" : "inconsistent") + " control"
      ],
      strengths: [
        "Good proportional relationship between descenders and x-height",
        "Maintains consistent descender depth across most instances",
        "Clear distinction between descender letters and baseline letters"
      ],
      weaknesses: [
        "Some descenders curl or hook unpredictably",
        "Descender length varies between different letters (g, y, p, q)",
        "Occasional collision with descenders from the line below"
      ],
      recommendations: [
        "Practice with guidelines that include descender space",
        "Focus on maintaining straight descenders without hooks unless stylistically intended",
        "Use consistent line spacing to prevent descender collisions"
      ]
    },
    xHeight: {
      consistency: generateScore(75, 25),
      proportion: generateScore(80, 20),
      details: [
        "X-height consistency is " + (generateScore(75, 25) > 70 ? "well-maintained" : "variable") + " across text",
        "Proportional relationship between x-height and overall letter size is " + (generateScore(80, 20) > 75 ? "balanced" : "inconsistent")
      ],
      strengths: [
        "Maintains consistent x-height for most lowercase letters",
        "Good proportional relationship between x-height and capital letters",
        "Creates clear visual rhythm through consistent letter bodies"
      ],
      weaknesses: [
        "Some rounded letters (a, o) appear smaller than other x-height letters",
        "X-height consistency diminishes toward the end of lines or paragraphs",
        "Occasional vertical compression affects readability of complex letters"
      ],
      recommendations: [
        "Practice with x-height guidelines to establish muscle memory",
        "Focus on making rounded letters the same height as angular letters",
        "Use consistent x-height as a foundation before focusing on ascenders/descenders"
      ]
    },
    slant: {
      angle: generateScore(70, 30),
      consistency: generateScore(65, 35),
      details: [
        "Writing slant averages " + (generateScore(70, 30) > 65 ? "a consistent angle" : "variable angles") + " throughout the text",
        "Letter alignment follows " + (generateScore(65, 35) > 60 ? "a unified directional trend" : "inconsistent orientation")
      ],
      strengths: [
        "Maintains reasonably consistent slant direction throughout most text",
        "Similar letters show comparable slant angles when repeated",
        "Slant contributes to a personal writing style without affecting readability"
      ],
      weaknesses: [
        "Slant angle varies between different letter forms (straight vs. curved letters)",
        "Inconsistent slant when transitioning between words or after pauses",
        "Some letters appear to have a contradictory slant to the overall pattern"
      ],
      recommendations: [
        "Practice with slant guide sheets (available as printable templates)",
        "Position paper at a consistent angle that feels comfortable for your writing hand",
        "Focus on maintaining parallel slant lines in all downstrokes"
      ]
    },
    letterShapes: {
      accuracy: generateScore(75, 25),
      consistency: generateScore(70, 30),
      distinctiveness: generateScore(65, 35),
      details: [
        "Letter form accuracy is " + (generateScore(75, 25) > 70 ? "generally good" : "needing improvement") + " compared to standard forms",
        "Shape consistency is " + (generateScore(70, 30) > 65 ? "maintained" : "variable") + " when letters repeat",
        "Letters are " + (generateScore(65, 35) > 60 ? "clearly distinguishable" : "occasionally ambiguous") + " from each other"
      ],
      strengths: [
        "Most letters are immediately recognizable without context",
        "Maintains consistent letter shapes when the same character repeats",
        "Distinctive personal style without sacrificing legibility"
      ],
      weaknesses: [
        "Some similar letters (a/o, n/m) lack sufficient distinguishing features",
        "Letter forms sometimes deteriorate when writing quickly",
        "Inconsistent formation of complex letter components (e.g., the loop in 'g')"
      ],
      recommendations: [
        "Practice problematic letters individually with slow, deliberate movements",
        "Focus on the distinguishing features that differentiate similar letters",
        "Use tracing exercises to build muscle memory for consistent letter shapes"
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

  // Generate overall assessment
  const overallAssessment = {
    strengths: [
      "Good baseline consistency on lined paper",
      "Clearly formed letter shapes with personal style",
      "Appropriate spacing between words enhancing readability",
      "Well-proportioned ascenders and descenders"
    ],
    weaknesses: [
      "Variable pressure control affecting consistency",
      "Inconsistent slant angle throughout longer texts",
      "Letter spacing issues with certain character combinations",
      "X-height consistency diminishes when writing quickly"
    ],
    priorities: [
      "Focus first on developing consistent slant angle",
      "Improve pressure control through targeted exercises",
      "Practice maintaining consistent x-height across all letters",
      "Work on even spacing between problematic letter pairs"
    ],
    improvementPlan: [
      "Use slant guides for 10 minutes daily to establish muscle memory",
      "Practice with pressure-sensitive pens to develop better control",
      "Implement daily drills focusing on maintaining consistent x-height",
      "Slow down writing pace initially to focus on form over speed"
    ]
  };

  return {
    similarityScore: overallSimilarityScore,
    strokeAnalysis,
    gripAnalysis,
    baselineAnalysis,
    spacingAnalysis,
    pressureAnalysis,
    formationAnalysis,
    characterDetails: details.sort((a, b) => a.character.localeCompare(b.character)),
    overallAssessment
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
