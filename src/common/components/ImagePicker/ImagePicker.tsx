import Box from '@mui/material/Box';

import ImagePreview from './components/ImagePreview';
import ImageDrop from './components/ImageDrop';
import ImagePaste from './components/ImagePaste';

import useImagePicker from '@/common/hooks/useImagePicker';

import { ImagePickerProps } from '@/common/types/props';

const ImagePicker = (props: ImagePickerProps) => {
  const { pasteImage, onClearFile, previewUrl, dropzone } =
    useImagePicker(props);

  return (
    <Box
      sx={{
        width: '100%',
      }}
      my={4}
      position="relative"
    >
      {' '}
      {previewUrl ? (
        <ImagePreview previewUrl={previewUrl} onClear={onClearFile} />
      ) : (
        <Box>
          <ImageDrop dropzone={dropzone} />
          <Box mt={2}>
            <ImagePaste onPaste={pasteImage} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ImagePicker;
