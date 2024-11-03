import Box from '@mui/material/Box';

import { useDropzone, FileWithPath } from 'react-dropzone';

import ImageDrop from '@/common/components/ImagePicker/components/ImageDrop';

import { PhotoActionType } from '@/spotting/types';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

const PhotoDropZone = () => {
  const { dispatch } = usePhotoInfoContext();

  const dropzone = useDropzone({
    onDrop: (files: FileWithPath[]) =>
      dispatch({ type: PhotoActionType.FILES_DROP, payload: files }),
  });

  return (
    <Box>
      <ImageDrop dropzone={dropzone} />
    </Box>
  );
};

export default PhotoDropZone;
