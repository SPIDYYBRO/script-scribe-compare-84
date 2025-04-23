
import { supabase } from "@/integrations/supabase/client";

export const saveAnalysisResult = async (
  imageUrl: string,
  comparisonType: 'font' | 'image',
  comparisonTarget: string,
  similarityScore: number,
  analysisData: any
) => {
  const { data, error } = await supabase
    .from('analysis_records')
    .insert([{
      image_url: imageUrl,
      comparison_type: comparisonType,
      comparison_target: comparisonTarget,
      similarity_score: similarityScore,
      analysis_data: analysisData
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getAnalysisHistory = async () => {
  const { data, error } = await supabase
    .from('analysis_records')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};
