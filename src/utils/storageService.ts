
import { getAnalysisById, getAnalysisHistory, removeAnalysisRecord } from "./analysisService";

// Local storage keys
const HISTORY_KEY = 'analysis_history';

// For now, this is a wrapper around the Supabase service
// This allows us to easily switch between local storage and Supabase

export const getAnalysisRecord = async (id: string) => {
  try {
    return await getAnalysisById(id);
  } catch (error) {
    console.error("Error fetching analysis record:", error);
    return null;
  }
};

export const getAnalysisHistory = async () => {
  try {
    return await getAnalysisHistory();
  } catch (error) {
    console.error("Error fetching analysis history:", error);
    return [];
  }
};

export const removeAnalysisRecord = async (id: string) => {
  try {
    return await removeAnalysisRecord(id);
  } catch (error) {
    console.error("Error removing analysis record:", error);
    return false;
  }
};
