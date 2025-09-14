import JSZip from 'jszip';

// const downloadZip = async (zip: JSZip, fileName: string) => {
//   const zipData = await zip.generateAsync({
//     type: 'blob',
//     streamFiles: true,
//   });

//   const link = document.createElement('a');
//   link.href = window.URL.createObjectURL(zipData);
//   link.download = `${fileName}.zip`;
//   link.click();
// };

async function downloadZip(zip: JSZip, fileName: string) {
  // Ask browser for a file stream
  const stream = (window as any).showSaveFilePicker
    ? await (window as any).showSaveFilePicker({
        suggestedName: `${fileName}.zip`,
        types: [
          { description: 'ZIP file', accept: { 'application/zip': ['.zip'] } },
        ],
      })
    : null;

  let writable: WritableStreamDefaultWriter<any>;

  if (stream) {
    // Modern API (File System Access API)
    writable = await stream.createWritable();
  } else {
    // Fallback: in-memory Blob + FileSaver
    const blob = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.zip`;
    link.click();
    return;
  }

  // Stream chunks to disk
  await new Promise<void>((resolve, reject) => {
    const internalStream = zip.generateInternalStream({
      type: 'uint8array',
      streamFiles: true,
    });

    internalStream
      .on('data', async (chunk: Uint8Array) => {
        await writable.write(chunk);
      })
      .on('error', (err: any) => {
        reject(err);
      })
      .on('end', async () => {
        await writable.close();
        resolve();
      })
      .resume();
  });
}

export default downloadZip;
