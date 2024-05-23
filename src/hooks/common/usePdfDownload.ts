import { useCallback, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const usePdfDownload = (fileName = 'file') => {
  const pdfRef = useRef(null);

  const onDownloadPdf = useCallback(() => {
    const input = pdfRef?.current as unknown as HTMLElement;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`${fileName}.pdf`);
    });
  }, [pdfRef, fileName]);

  return { pdfRef, onDownloadPdf };
};

export default usePdfDownload;
