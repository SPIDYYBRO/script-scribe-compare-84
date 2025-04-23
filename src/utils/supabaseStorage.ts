
import { supabase } from "@/integrations/supabase/client";

export const uploadImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  // Upload with no size restrictions - Supabase defaults allow up to 50MB
  const { data, error } = await supabase.storage
    .from('handwriting-samples')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Storage upload error:', error);
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('handwriting-samples')
    .getPublicUrl(filePath);

  return publicUrl;
};
