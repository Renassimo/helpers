import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import usePhotoInfoSaver from '@/spotting/hooks/usePhotoInfoSaver';

const PhotoFolderSaver = () => {
  const { loading, onSave, progressText } = usePhotoInfoSaver();

  return (
    <Box
      display="flex"
      justifyContent={progressText ? 'space-between' : 'right'}
    >
      {progressText && (
        <Typography variant="subtitle2" mr={2}>
          {progressText}
        </Typography>
      )}
      <LoadingButton loading={loading} onClick={onSave}>
        Save
      </LoadingButton>
    </Box>
  );
};

export default PhotoFolderSaver;
