import { FileWithPreview } from '@/common/types/files';

import { getFileWithPreview, getPastedFile } from './files';

export const getPastedFileWithPreview = async (): Promise<FileWithPreview> => {
  const file = await getPastedFile();
  return getFileWithPreview(file);
};
