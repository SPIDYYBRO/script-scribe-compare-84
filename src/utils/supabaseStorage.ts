
import { supabase } from "@/integrations/supabase/client";

export const uploadImage = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
  // Check file size before processing
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 5MB limit');
  }

  // Only resize if it's an image
  const resizedFile = file.type.startsWith('image/') ? 
    await resizeImageIfNeeded(file) : 
    file;
  
  const fileExt = resizedFile.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('handwriting-samples')
    .upload(filePath, resizedFile, {
      cacheControl: '3600',
      upsert: true
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

const resizeImageIfNeeded = async (file: File): Promise<File> => {
  const img = new Image();
  const imgPromise = new Promise<HTMLImageElement>((resolve) => {
    img.onload = () => resolve(img);
    img.src = URL.createObjectURL(file);
  });

  const loadedImg = await imgPromise;
  
  // Calculate new dimensions (maintain aspect ratio)
  let width = loadedImg.width;
  let height = loadedImg.height;
  const maxDimension = 1024; // Reduced for faster processing

  if (width > height && width > maxDimension) {
    height = Math.round((height * maxDimension) / width);
    width = maxDimension;
  } else if (height > maxDimension) {
    width = Math.round((width * maxDimension) / height);
    height = maxDimension;
  }

  // Create canvas and draw image
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(loadedImg, 0, 0, width, height);
  
  // Clean up
  URL.revokeObjectURL(img.src);
  
  // Convert to blob with optimal settings for size/quality balance
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else resolve(new Blob([]));
    }, file.type, 0.8); // Reduced quality for faster upload
  });
  
  return new File([blob], file.name, { type: file.type });
};
