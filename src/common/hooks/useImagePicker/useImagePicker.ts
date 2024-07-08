import { useEffect, useState } from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';

import usePasteImage from '@/common/hooks/usePasteImage';

import { getFileWithPreview } from '@/common/utils/files';

import { ImagePickerProps } from '@/common/types/props';

const useImagePicker = (
  props: ImagePickerProps
): {
  pasteImage: () => void;
  onClearFile: () => void;
  previewUrl: string;
  dropzone: DropzoneState;
} => {
  const { imageUrl = '', imageFile, setImageFile } = props;

  const { pasteImage } = usePasteImage();

  const dropzone = useDropzone({
    accept: {
      'image/png': [],
      'image/jpeg': [],
      'image/webp': [],
      'image/gif': [],
    },
    maxFiles: 1,
    onDrop: ([file]) => setImageFile(getFileWithPreview(file)),
  });

  const [previewUrl, setPreviewUrl] = useState<string>(imageUrl);

  const paste = async () => {
    const image = await pasteImage();
    setImageFile(image);
  };

  const onClearFile = () => {
    setImageFile(null);
  };

  useEffect(() => {
    setPreviewUrl(imageFile?.preview ?? imageUrl);
  }, [imageFile?.preview]);

  return {
    pasteImage: paste,
    onClearFile,
    previewUrl,
    dropzone,
  };
};

export default useImagePicker;
