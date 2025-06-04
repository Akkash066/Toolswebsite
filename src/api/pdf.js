// Handles all PDF-related API calls
export const compressPdf = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const res = await fetch('/api/compress-pdf', {
      method: 'POST',
      body: formData,
    });
    return await res.blob();
  } catch (err) {
    throw new Error("PDF compression failed");
  }
};