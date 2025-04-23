
import { supabase } from "@/integrations/supabase/client";

// Define a type for the analysis record to help with type checking
export interface AnalysisRecord {
  id: string;
  user_id: string;
  image_url: string;
  comparison_type: 'font' | 'image';
  comparison_target: string;
  similarity_score: number;
  analysis_data: any;
  created_at: string;
}

export const saveAnalysisResult = async (
  imageUrl: string,
  comparisonType: 'font' | 'image',
  comparisonTarget: string,
  similarityScore: number,
  analysisData: any
) => {
  // Add user_id to the data being inserted
  const { data: authData } = await supabase.auth.getUser();
  const userId = authData?.user?.id;
  
  // Using the generic query method to bypass type checking
  const { data, error } = await supabase
    .from('analysis_records')
    .insert({
      user_id: userId,
      image_url: imageUrl,
      comparison_type: comparisonType,
      comparison_target: comparisonTarget,
      similarity_score: similarityScore,
      analysis_data: analysisData
    })
    .select('*')
    .single();

  if (error) throw error;
  return data as AnalysisRecord;
};

export const getAnalysisHistory = async () => {
  // Using the generic query method to bypass type checking
  const { data, error } = await supabase
    .from('analysis_records')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as AnalysisRecord[];
};

export const getAnalysisById = async (id: string) => {
  const { data, error } = await supabase
    .from('analysis_records')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data as AnalysisRecord;
};

export const removeAnalysisRecord = async (id: string) => {
  const { error } = await supabase
    .from('analysis_records')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  return true;
};
