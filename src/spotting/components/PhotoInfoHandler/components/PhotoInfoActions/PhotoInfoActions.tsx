import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { PhotoActionType } from '@/spotting/types';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

const PhotoInfoActions = () => {
  const { photosList, handlingText, dispatch } = usePhotoInfoContext();

  const clearSelections = () =>
    dispatch({ type: PhotoActionType.UNSELECT_ALL });
  const selectAll = () => dispatch({ type: PhotoActionType.SELECT_ALL });
  const deleteAll = () => dispatch({ type: PhotoActionType.CLEAR_FILES });
  const createFolder = () => dispatch({ type: PhotoActionType.CREATE_FOLDER });

  return (
    <Box>
      {photosList.length > 0 && (
        <>
          <Button onClick={selectAll}>Select all</Button>
          <Button onClick={clearSelections}>Clear selections</Button>
          <Button onClick={deleteAll}>Delete all</Button>
          <Button onClick={createFolder}>Create folder</Button>
        </>
      )}
      {handlingText && <Typography>{handlingText}</Typography>}
    </Box>
  );
};

export default PhotoInfoActions;
