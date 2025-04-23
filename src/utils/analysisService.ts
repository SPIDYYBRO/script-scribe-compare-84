
import { supabase } from "@/integrations/supabase/client";

// Define the AnalysisRecord interface to match the database schema
export interface AnalysisRecord {
  id: string;
  user_id: string | null;
  image_url: string;
  comparison_type: string;
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
  const { data: authData } = await supabase.auth.getUser();
  const userId = authData?.user?.id;
  
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
