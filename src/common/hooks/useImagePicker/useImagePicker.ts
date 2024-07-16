import { useEffect, useState } from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';

import usePasteImage from '@/common/hooks/usePasteImage';

import { getFileWithPreview } from '@/common/utils/files';

import { ImagePickerProps } from '@/common/types/props';
import { FileWithPreview } from '@/common/types/files';

const useImagePicker = (
  props: ImagePickerProps
): {
  pasteImage: () => void;
  onClearFile: () => void;
  previewUrl: string;
  dropzone: DropzoneState;
} => {
  const { defaultUrlValue = '', onChange } = props;

  const { pasteImage } = usePasteImage();

  const [previewUrl, setPreviewUrl] = useState<string>(defaultUrlValue);
  const [touched, setTouched] = useState(false);

  const handleChange = (image: FileWithPreview | null) => {
    setTouched(true);
    onChange(image);
    setPreviewUrl(image?.preview ?? '');
  };

  useEffect(() => {
    if (!touched) setPreviewUrl(defaultUrlValue);
  }, [defaultUrlValue, touched]);

  const dropzone = useDropzone({
    accept: {
      'image/png': [],
      'image/jpeg': [],
      'image/webp': [],
      'image/gif': [],
    },
    maxFiles: 1,
    onDrop: ([file]) => handleChange(getFileWithPreview(file)),
  });

  const paste = async () => {
    const image = await pasteImage();
    handleChange(image);
  };

  const onClearFile = () => {
    handleChange(null);
  };

  return {
    pasteImage: paste,
    onClearFile,
    previewUrl,
    dropzone,
  };
};

export default useImagePicker;
