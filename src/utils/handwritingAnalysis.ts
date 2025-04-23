
// Handwriting analysis utility functions

// Simulated handwriting analysis that compares a handwriting sample with a reference
export const analyzeHandwriting = (handwritingSample: string, comparisonType: string, comparisonSample?: string, comparisonFont?: string) => {
  // This is a simulated analysis - in a real app, this would use ML or computer vision
  
  // Generate a somewhat random but consistent score based on inputs
  // In a real app, this would be replaced by actual image analysis
  const generateScore = (base: number, variance: number) => {
    // Create a deterministic but seemingly random score based on the inputs
    const seed = handwritingSample.length + (comparisonSample?.length || 0) + (comparisonFont?.length || 0);
    const pseudoRandom = Math.sin(seed) * 10000;
    return Math.min(100, Math.max(0, Math.floor(base + (pseudoRandom % variance))));
  };

  const similarityScore = generateScore(70, 30); // Base score of 70% with variance
  
  const characterSpacing = generateScore(75, 25);
  const lineConsistency = generateScore(65, 35);
  const characterFormation = generateScore(60, 40);
  const pressure = generateScore(85, 15);
  const slant = generateScore(70, 30);
  
  // Generate analysis details for common letters
  const letters = ['a', 'e', 't', 'r', 's', 'o', 'n', 'i', 'l', 'h'];
  const details = letters.map(letter => {
    const score = generateScore(60, 40);
    
    // Generate feedback based on score
    let notes = "";
    if (score >= 80) {
      notes = `Your '${letter}' is very similar to the comparison.`;
    } else if (score >= 60) {
      notes = `Your '${letter}' has good similarity but with some differences in ${
        Math.random() > 0.5 ? 'loops' : 'strokes'
      }.`;
    } else {
      notes = `Your '${letter}' differs significantly from the comparison in ${
        Math.random() > 0.5 ? 'shape' : 'style'
      }.`;
    }
    
    return {
      character: letter,
      similarityScore: score,
      notes
    };
  });
  
  // Sort details by character for consistency
  details.sort((a, b) => a.character.localeCompare(b.character));
  
  return {
    similarityScore,
    characterSpacing,
    lineConsistency,
    characterFormation,
    pressure,
    slant,
    details
  };
};

// Generate a unique ID for analysis records
export const generateAnalysisId = () => {
  return 'analysis-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};
