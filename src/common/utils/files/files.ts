import { FileWithPreview } from '@/common/types/files';

export const getFileWithPreview = (file: File): FileWithPreview => {
  return Object.assign(file, {
    preview: URL.createObjectURL(file),
  });
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
