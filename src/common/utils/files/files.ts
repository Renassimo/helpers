import { FileWithPreview } from '@/common/types/files';

export const getFileWithPreview = (file: File): FileWithPreview => {
  const preview = URL.createObjectURL(file);

  return Object.assign(file, {
    preview,
  });
};

export const updateImageRatio = (
  file: FileWithPreview | null,
  callback: (ratio: number | null) => void
) => {
  if (file) {
    const image = new Image();
    image.onload = () => {
      const ratio = image.width / image.height;
      callback(ratio);
    };

    image.src = file.preview;
  } else {
    callback(null);
  }
};

export const getPastedFile = async (props?: {
  format?: string;
  name?: string;
}): Promise<File> => {
  const { format = 'image/png', name = 'image' } = props ?? {};
  const clipboardItems = await navigator.clipboard.read();
  const blob = await clipboardItems[0].getType(format);
  return new File([blob], name);
};
