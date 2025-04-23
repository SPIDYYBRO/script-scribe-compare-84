
// Local storage service for storing analysis results

type AnalysisRecord = {
  id: string;
  date: string;
  imageUrl: string;
  comparisonType: 'font' | 'image';
  comparisonTarget: string;
  similarityScore: number;
  analysisData: any;
};

const STORAGE_KEY = 'script-check-analysis-history';

// Retrieve analysis history from local storage
export const getAnalysisHistory = (): AnalysisRecord[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to retrieve analysis history:', error);
    return [];
  }
};

// Save a new analysis record to history
export const saveAnalysisRecord = (record: AnalysisRecord): void => {
  try {
    const history = getAnalysisHistory();
    const updatedHistory = [record, ...history].slice(0, 50); // Keep up to 50 records
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Failed to save analysis record:', error);
  }
};

// Remove an analysis record from history
export const removeAnalysisRecord = (id: string): void => {
  try {
    const history = getAnalysisHistory();
    const updatedHistory = history.filter(record => record.id !== id);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Failed to remove analysis record:', error);
  }
};

// Get a specific analysis record by ID
export const getAnalysisRecord = (id: string): AnalysisRecord | null => {
  try {
    const history = getAnalysisHistory();
    return history.find(record => record.id === id) || null;
  } catch (error) {
    console.error('Failed to get analysis record:', error);
    return null;
  }
};

// Clear all analysis history
export const clearAnalysisHistory = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (error) {
    console.error('Failed to clear analysis history:', error);
  }
};
