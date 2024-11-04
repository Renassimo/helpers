import { PhotoFolder } from '../types';

const createPhotoInfo = async (
  foldersList: PhotoFolder[],
  setLoading: (loading: boolean) => void,
  setProgressText: (text: string) => void
): Promise<{ value: any; ok: boolean }[]> => {
  setLoading(true);

  const responses = [];

  for (const folder of foldersList) {
    setProgressText(
      `Saving ${responses.length + 1} of ${foldersList.length} folders`
    );
    const { attributes } = folder;
    if (!attributes)
      responses.push({
        value: { error: { message: 'No attributes provided' } },
        ok: false,
      });

    const response = await fetch('/api/photoInfo', {
      method: 'POST',
      body: JSON.stringify({ data: { attributes } }),
    });
    const value = await response.json();

    responses.push({ value, ok: !!response.ok });
  }

  setProgressText('');
  setLoading(false);

  return responses;
};

export default createPhotoInfo;
