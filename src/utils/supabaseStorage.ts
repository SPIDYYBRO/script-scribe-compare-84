import { supabase } from "@/integrations/supabase/client";

export const uploadImage = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
  // Resize the image before uploading if it's too large
  const resizedFile = await resizeImageIfNeeded(file);
  
  const fileExt = resizedFile.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  // Upload with progress tracking
  const { data, error } = await supabase.storage
    .from('handwriting-samples')
    .upload(filePath, resizedFile, {
      cacheControl: '3600',
      upsert: true, // Use upsert to replace any existing file
      onUploadProgress: (progress) => {
        if (onProgress) {
          const percent = progress.loaded / progress.total * 100;
          onProgress(percent);
        }
      }
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

// Helper function to resize large images before uploading
const resizeImageIfNeeded = async (file: File): Promise<File> => {
  // If file is not an image or is small enough, return it as is
  if (!file.type.startsWith('image/') || file.size <= 1000000) { // 1MB threshold
    return file;
  }

  // Create an image element to load the file
  const img = new Image();
  const imgPromise = new Promise<HTMLImageElement>((resolve) => {
    img.onload = () => resolve(img);
    img.src = URL.createObjectURL(file);
  });

  // Wait for the image to load
  const loadedImg = await imgPromise;
  
  // Calculate new dimensions (maintain aspect ratio)
  let width = loadedImg.width;
  let height = loadedImg.height;
  const maxDimension = 1200; // Max width/height in pixels

  if (width > height && width > maxDimension) {
    height = Math.round((height * maxDimension) / width);
    width = maxDimension;
  } else if (height > maxDimension) {
    width = Math.round((width * maxDimension) / height);
    height = maxDimension;
  }

  // Draw the resized image to a canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(loadedImg, 0, 0, width, height);
  
  // Clean up object URL
  URL.revokeObjectURL(img.src);
  
  // Convert canvas to blob and then to File
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else resolve(new Blob([]));
    }, file.type, 0.85); // 0.85 quality to further reduce size
  });
  
  // Create a new file with the same name but resized content
  return new File([blob], file.name, { type: file.type });
};
