const compressImage = async (file: File, { quality = 1, type = file.type }) => {
  // Get as image data
  const imageBitmap = await createImageBitmap(file);

  // Draw to canvas
  const canvas = document.createElement('canvas');
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(imageBitmap, 0, 0);

  // Turn into Blob
  const blob: Blob = await new Promise((resolve) =>
    // @ts-ignore
    canvas.toBlob(resolve, type, quality)
  );

  // Turn Blob into File
  return new File([blob], file.name, {
    type: blob.type,
  });
};
// todo add tests
export default compressImage;
