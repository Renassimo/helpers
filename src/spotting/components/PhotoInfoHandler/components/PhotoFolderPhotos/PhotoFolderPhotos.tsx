import { memo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { PhotoActionType } from '@/spotting/types';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import PhotoInfoCard from '@/spotting/components/PhotoInfoHandler/components/PhotoInfoCard';

const MemorizedCard = memo(PhotoInfoCard);

const PhotoFolderPhotos = () => {
  const { showingFolder, dispatch } = usePhotoInfoContext();

  const onOpenZoom = useCallback(
    (path: string) =>
      dispatch({ type: PhotoActionType.SET_ZOOMED_PHOTO, payload: path }),
    []
  );
  const onRemoveFromFolder = useCallback(
    (path: string) =>
      dispatch({ type: PhotoActionType.REMOVE_FROM_FOLDER, payload: path }),
    []
  );
  const onRemoveFolder = useCallback(
    (id: string) =>
      dispatch({ type: PhotoActionType.REMOVE_FOLDER, payload: id }),
    []
  );
  const onDuplicatePhoto = useCallback(
    (id: string) =>
      dispatch({ type: PhotoActionType.DUPLICATE_PHOTO, payload: id }),
    []
  );

  return (
    <Box width="100%">
      {showingFolder && (
        <Box>
          <>
            <Button onClick={() => onRemoveFolder?.(showingFolder?.id)}>
              Remove folder
            </Button>
          </>
        </Box>
      )}
      <Grid container spacing={2} py={2}>
        {showingFolder &&
          Object.values(showingFolder.photos).map((photo) => (
            <Grid
              maxWidth={300}
              key={photo.path}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <MemorizedCard
                selected={photo.selected}
                name={photo.name}
                preview={photo.preview}
                id={photo.path}
                onOpenZoom={onOpenZoom}
                onRemoveFromFolder={onRemoveFromFolder}
                onDuplicate={onDuplicatePhoto}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default PhotoFolderPhotos;
