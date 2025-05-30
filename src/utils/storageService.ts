
import { getAnalysisById } from "./analysisService";

// Local storage keys
const HISTORY_KEY = 'analysis_history';

// For now, this is a wrapper around the analysisService
// This allows us to easily switch between local storage and Supabase

export const getAnalysisRecord = async (id: string) => {
  try {
    return await getAnalysisById(id);
  } catch (error) {
    console.error("Error fetching analysis record:", error);
    return null;
  }
};

export { getAnalysisHistory } from "./analysisService";
export { removeAnalysisRecord } from "./analysisService";
