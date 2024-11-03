import { memo, useCallback } from 'react';

import Grid from '@mui/material/Grid';

import { PhotoActionType } from '@/spotting/types';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import PhotoInfoCard from '@/spotting/components/PhotoInfoHandler/components/PhotoInfoCard';

const MemorizedCard = memo(PhotoInfoCard);

const PhotosList = () => {
  const { photosList, dispatch } = usePhotoInfoContext();

  const onPhotoSelected = useCallback((path: string) => {
    dispatch({ type: PhotoActionType.SELECT, payload: path });
  }, []);

  const onOpenZoom = useCallback(
    (path: string) =>
      dispatch({ type: PhotoActionType.SET_ZOOMED_PHOTO, payload: path }),
    []
  );

  return (
    <Grid container spacing={2} py={2}>
      {photosList.map((photo) => (
        <Grid maxWidth={300} key={photo.path} item xs={12} sm={6} md={4} lg={3}>
          <MemorizedCard
            selected={photo.selected}
            onPhotoSelected={onPhotoSelected}
            name={photo.name}
            preview={photo.preview}
            id={photo.path}
            onOpenZoom={onOpenZoom}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PhotosList;
