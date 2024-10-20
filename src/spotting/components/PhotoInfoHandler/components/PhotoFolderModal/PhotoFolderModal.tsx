import { useCallback } from 'react';

import { PhotoActionType } from '@/spotting/types';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import SimpleModal from '@/common/components/Modal/SimpleModal';

import PhotoFolderPhotos from '@/spotting/components/PhotoInfoHandler/components/PhotoFolderPhotos';
import PhotoFolderForm from '@/spotting/components/PhotoInfoHandler/components/PhotoFolderForm';

const PhotoFolderModal = () => {
  const { showingFolder, dispatch } = usePhotoInfoContext();

  const onCloseModal = useCallback(
    () => dispatch({ type: PhotoActionType.CLEAR_FOLDER_MODAL }),
    []
  );

  return (
    <SimpleModal open={!!showingFolder} onClose={onCloseModal} fullWidth>
      <PhotoFolderPhotos />
      <PhotoFolderForm />
    </SimpleModal>
  );
};

export default PhotoFolderModal;
