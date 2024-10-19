import { useCallback } from 'react';

import Box from '@mui/material/Box';

import { PhotoActionType } from '@/spotting/types';

import SimpleModal from '@/common/components/Modal/SimpleModal';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

const PhotoZoomModal = () => {
  const { zoomedPhoto, dispatch } = usePhotoInfoContext();

  const onClose = useCallback(
    () => dispatch({ type: PhotoActionType.CLEAR_ZOOMED_PHOTO }),
    []
  );

  return (
    <SimpleModal
      open={!!zoomedPhoto}
      onClose={onClose}
      title={zoomedPhoto?.path || ''}
      maxWidth="xl"
    >
      <Box>
        <img
          src={zoomedPhoto?.preview}
          alt={zoomedPhoto?.path}
          style={{ width: '100%' }}
        />
      </Box>
    </SimpleModal>
  );
};

export default PhotoZoomModal;
