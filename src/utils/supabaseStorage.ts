
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
    
    // Only resize if it's an image
    const resizedFile = file.type.startsWith('image/') ? 
      await resizeImageIfNeeded(file, onProgress) : 
      file;
    
    // Report progress after resize
    onProgress && onProgress(50);
    
    const fileExt = resizedFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Add timeout handling
    const uploadPromise = supabase.storage
      .from('handwriting-samples')
      .upload(filePath, resizedFile, {
        cacheControl: '3600',
        upsert: true
      });
    
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Upload timed out after 30 seconds')), 30000);
    });
    
    // Race the upload against the timeout
    const { data, error } = await Promise.race([
      uploadPromise,
      timeoutPromise.then(() => Promise.reject(new Error('Upload timed out')))
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
  
  onProgress && onProgress(40);
  
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
