import { memo, useCallback } from 'react';

import Grid from '@mui/material/Grid';

import { PhotoActionType } from '@/spotting/types';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import PhotoInfoCard from '@/spotting/components/PhotoInfoHandler/components/PhotoInfoCard';

const MemorizedCard = memo(PhotoInfoCard);

const PhotoFoldersList = () => {
  const { foldersList, dispatch } = usePhotoInfoContext();

  const onRemoveFolder = useCallback(
    (id: string) =>
      dispatch({ type: PhotoActionType.REMOVE_FOLDER, payload: id }),
    []
  );

  return (
    <Grid container spacing={2} py={2}>
      {foldersList.map((folder) => {
        const [first] = Object.values(folder.photos);
        if (!first) return null;
        return (
          <Grid
            maxWidth={300}
            key={first.path}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <MemorizedCard
              name={first.name}
              preview={first.preview}
              id={folder.id}
              onClick={() =>
                dispatch({
                  type: PhotoActionType.SET_FOLDER_MODAL,
                  payload: folder.id,
                })
              }
              onRemoveFromFolder={onRemoveFolder}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PhotoFoldersList;
