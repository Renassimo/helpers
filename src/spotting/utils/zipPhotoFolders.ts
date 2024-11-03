import JSZip from 'jszip';

import { FileWithPath } from 'react-dropzone';
import { PhotoFolder } from '../types';

import downloadZip from '@/common/utils/files/downloadZip';

const zipPhotoFolders = async (
  foldersList: PhotoFolder[],
  files: FileWithPath[]
) => {
  if (!foldersList.length) return;
  const zip = new JSZip();

  const fileName =
    Object.keys(foldersList[0]?.photos || {})[0]?.split('/')[1] || 'planes';

  foldersList.forEach(({ photos, attributes }, index) => {
    const { title } = attributes || { title: `Folder ${index + 1}` };
    Object.values(photos).forEach((photo) => {
      zip.file(`${title}/FINAL/${photo.name}`, photo.file);
      files.forEach((file) => {
        const fileName = file.name;
        const [fileNameShort] = fileName.split('.');
        const photoName = photo.name;
        const [photoNameShort] = photoName.split('.');
        if (fileNameShort === photoNameShort && fileName !== photoName)
          zip.file(`${title}/${fileName}`, file);
      });
    });
  });

  await downloadZip(zip, fileName);
};

export default zipPhotoFolders;
