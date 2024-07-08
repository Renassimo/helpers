import { useState } from 'react';

import { getPastedFileWithPreview } from '@/common/utils/files';

import { FileWithPreview } from '@/common/types/files';

const usePasteImage = () => {
  const [image, setImage] = useState<FileWithPreview | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  const pasteImage = async (): Promise<FileWithPreview | null> => {
    setError(null);
    setImage(null);

    try {
      const fileWithPreview = await getPastedFileWithPreview();
      setImage(fileWithPreview);
      return fileWithPreview;
    } catch (e) {
      setError(e);
      return null;
    }
  };

  return {
    image,
    error,
    pasteImage,
  };
};

export default usePasteImage;
