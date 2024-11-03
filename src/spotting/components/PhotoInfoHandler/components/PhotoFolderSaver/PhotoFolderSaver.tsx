import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import usePhotoInfoSaver from '@/spotting/hooks/usePhotoInfoSaver';

const PhotoFolderSaver = () => {
  const { loading, onSave } = usePhotoInfoSaver();

  return (
    <Box display="flex" justifyContent="right">
      <LoadingButton loading={loading} onClick={onSave}>
        Save
      </LoadingButton>
    </Box>
  );
};

export default PhotoFolderSaver;
