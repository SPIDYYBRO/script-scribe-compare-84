
import { supabase } from "@/integrations/supabase/client";

export const uploadImage = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
  // Check file size before processing
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 5MB limit');
  }

  try {
    // Report initial progress
    onProgress && onProgress(10);
    
    // Only resize if it's an image and larger than 1MB
    const resizedFile = file.type.startsWith('image/') && file.size > 1024 * 1024 ? 
      await resizeImageIfNeeded(file, onProgress) : 
      file;
    
    // Report progress after resize
    onProgress && onProgress(50);
    
    const fileExt = resizedFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload with a shorter timeout
    const { data, error } = await Promise.race([
      supabase.storage
        .from('handwriting-samples')
        .upload(filePath, resizedFile, {
          cacheControl: '3600',
          upsert: true
        }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Upload timed out after 15 seconds')), 15000)
      )
    ]) as any;

    // Report progress after upload completes
    onProgress && onProgress(90);

    if (error) {
      console.error('Storage upload error:', error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('handwriting-samples')
      .getPublicUrl(filePath);

    // Report completion
    onProgress && onProgress(100);
    
    return publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

const resizeImageIfNeeded = async (file: File, onProgress?: (progress: number) => void): Promise<File> => {
  onProgress && onProgress(20);
  
  const img = new Image();
  const imgPromise = new Promise<HTMLImageElement>((resolve) => {
    img.onload = () => resolve(img);
    img.src = URL.createObjectURL(file);
  });

  const loadedImg = await imgPromise;
  onProgress && onProgress(30);
  
  // Calculate new dimensions (maintain aspect ratio)
  let width = loadedImg.width;
  let height = loadedImg.height;
  const maxDimension = 800; // Reduced for faster processing

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
  
  onProgress && onProgress(40);
  
  // Clean up
  URL.revokeObjectURL(img.src);
  
  // Convert to blob with optimal settings for size/quality balance
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else resolve(new Blob([]));
    }, file.type, 0.7); // Reduced quality for faster upload
  });
  
  return new File([blob], file.name, { type: file.type });
};
