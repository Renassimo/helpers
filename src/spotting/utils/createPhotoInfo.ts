import { PhotoFolder } from '../types';

const createPhotoInfo = async (
  foldersList: PhotoFolder[],
  setLoading: (loading: boolean) => void
): Promise<(PromiseFulfilledResult<any> | PromiseRejectedResult)[]> => {
  setLoading(true);
  const responses = await Promise.allSettled(
    foldersList.map(async ({ attributes }) => {
      if (!attributes) return Promise.resolve();

      const response = await fetch('/api/photoInfo', {
        method: 'POST',
        body: JSON.stringify({ data: { attributes } }),
      });
      return response.json();
    })
  );
  setLoading(false);
  return responses;
};

export default createPhotoInfo;
