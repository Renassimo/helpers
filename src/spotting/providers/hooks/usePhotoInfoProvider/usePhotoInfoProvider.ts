import { useEffect, useMemo, useState } from 'react';
import ExifReader from 'exifreader';

import compressImage from '@/common/utils/images/compressImage';
import { getFileWithPreview } from '@/common/utils/files';

import { Avia } from '@/avia/types/avia';
import {
  PhotoInfoContextState,
  PhotoActionType,
  PhotoInfo,
} from '@/spotting/types';

import useAviaOptions from '@/avia/hooks/useAviaOptions';
import useAviaMatchers from '@/avia/hooks/useAviaMatchers';

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
        const subfolder = path.split('/')[2];

        if (subfolder !== 'FINAL') continue;

        if (
          file.type !== 'image/jpeg' ||
          state.photos[path] ||
          Object.values(state.folders).find(
            (folder) => folder.photos[path]?.path === path
          )
        )
          continue;

        const compressedImage = await compressImage(file, { quality: 0.2 });

        const tags = (await ExifReader.load(file)) || {};
        const date =
          tags?.['DateTimeOriginal']?.description
            ?.split(' ')[0]
            .split(':')
            .join('-') || null;
        const lat = tags?.['GPSLatitude']?.description || null;
        const lon = tags?.['GPSLongitude']?.description || null;
        const location: Avia.Location | null =
          lat && lon ? { lat: Number(lat), lon: Number(lon) } : null;

        const photo: PhotoInfo = {
          file,
          path,
          name: file.name,
          selected: false,
          preview: getFileWithPreview(compressedImage).preview,
          date,
          location,
        };

        dispatch({ type: PhotoActionType.ADD_PHOTO, payload: photo });
      }
      setHandlingText('');
    };

    updatePhotos();
  }, [files]);

  const photosList = useMemo(() => Object.values(photos), [photos]);
  const foldersList = useMemo(() => Object.values(folders), [folders]);

  // Options
  const { data: options } = useAviaOptions();

  // Matchers
  const { data: matchers, updateMatchers } = useAviaMatchers();

  return {
    ...state,
    handlingText,
    dispatch,
    photosList,
    foldersList,
    options,
    matchers,
    updateMatchers,
  };
};

export default usePhotoInfoProvider;
