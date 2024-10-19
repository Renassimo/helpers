import { useEffect, useMemo, useState } from 'react';

import compressImage from '@/common/utils/images/compressImage';
import { getFileWithPreview } from '@/common/utils/files';

import { PhotoInfoContextState, PhotoActionType } from '@/spotting/types';

import usePhotoInfoReducer from '../usePhotoInfoReducer';

const usePhotoInfoProvider = (): PhotoInfoContextState => {
  const [handlingText, setHandlingText] = useState('');
  const [state, dispatch] = usePhotoInfoReducer();
  const { files, photos, folders } = state;

  useEffect(() => {
    const updatePhotos = async () => {
      for (let i = 0; i < files.length; i++) {
        const totalN = files.length;
        setHandlingText(`Handling: ${i + 1} of ${totalN}`);

        const file = files[i];

        const path = file.path as string;

        if (
          file.type !== 'image/jpeg' ||
          state.photos[path] ||
          Object.values(state.folders).find(
            (folder) => folder.photos[path]?.path === path
          )
        )
          continue;

        const compressedImage = await compressImage(file, { quality: 0.2 });
        const photo = {
          file,
          path,
          name: file.name,
          selected: false,
          preview: getFileWithPreview(compressedImage).preview,
        };

        dispatch({ type: PhotoActionType.ADD_PHOTO, payload: photo });
      }
      setHandlingText('');
    };

    updatePhotos();
  }, [files]);

  const photosList = useMemo(() => Object.values(photos), [photos]);
  const foldersList = useMemo(() => Object.values(folders), [folders]);

  return {
    ...state,
    handlingText,
    dispatch,
    photosList,
    foldersList,
  };
};

export default usePhotoInfoProvider;
