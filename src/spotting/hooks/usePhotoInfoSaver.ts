import { useCallback, useState } from 'react';

import useAlerts from '@/common/hooks/alerts';
import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import { PhotoActionType } from '../types';

import zipPhotoFolders from '../utils/zipPhotoFolders';
import createPhotoInfo from '../utils/createPhotoInfo';

const usePhotoInfoSaver = () => {
  const [loading, setLoading] = useState(false);

  const { foldersList, files, newMatchers, updateMatchers, dispatch } =
    usePhotoInfoContext();

  const { createSuccessAlert, createErrorAlert, createWarnAlert } = useAlerts();

  const getTitle = useCallback(
    (index: number) =>
      foldersList[index]?.attributes?.title || `Folder ${index + 1}`,
    [foldersList]
  );

  const onSave = async () => {
    if (!foldersList.length) return;

    zipPhotoFolders(foldersList, files);

    const responses = await createPhotoInfo(foldersList, setLoading);
    const responsesCount = responses.length;

    const errors: { title: string; error: string }[] = [];

    responses.forEach((response, index) => {
      const { status } = response;

      if (status === 'rejected')
        errors.push({
          title: getTitle(index),
          error: response.reason,
        });

      if (status === 'fulfilled') {
        const { value } = response;
        if (!value?.data?.id)
          errors.push({
            title: getTitle(index),
            error:
              value?.error?.message ||
              value?.error?.status ||
              value?.error?.status ||
              'Unknown error',
          });
      }
    });

    const errorsCount = errors.length;

    await updateMatchers(newMatchers);

    if (errorsCount === 0) {
      createSuccessAlert('All folders saved successfully');
      dispatch({ type: PhotoActionType.CLEAR_FILES });
    } else if (errorsCount === responsesCount) {
      createErrorAlert('No folders saved');
    } else if (errorsCount !== responsesCount) {
      createWarnAlert(
        `Only ${
          responsesCount - errorsCount
        } of ${responsesCount} folders saved`
      );
    }

    errors.forEach(({ title, error }) => {
      createErrorAlert(`${title} not saved: ${error}`);
    });
  };

  return { loading, onSave };
};

export default usePhotoInfoSaver;
