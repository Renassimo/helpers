import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ImagePreview = ({
  previewUrl,
  onClear,
}: {
  previewUrl: string;
  onClear: () => void;
}) => {
  return (
    <Box>
      <img alt="map" src={previewUrl} style={{ maxWidth: '100%' }} />
      <IconButton
        aria-label="clear"
        onClick={onClear}
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default ImagePreview;
