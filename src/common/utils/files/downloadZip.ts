import JSZip from 'jszip';

const downloadZip = async (zip: JSZip, fileName: string) => {
  const zipData = await zip.generateAsync({
    type: 'blob',
    streamFiles: true,
  });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(zipData);
  link.download = `${fileName}.zip`;
  link.click();
};

export default downloadZip;
