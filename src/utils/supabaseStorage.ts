
import { supabase } from "@/integrations/supabase/client";

export const uploadImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('handwriting-samples')
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('handwriting-samples')
    .getPublicUrl(filePath);

  return publicUrl;
};
