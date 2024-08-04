import Typography from '@mui/material/Typography';

import { DropzoneState } from 'react-dropzone';

const ImageDrop = ({ dropzone }: { dropzone: DropzoneState }) => {
  const { getRootProps, getInputProps, isDragAccept } = dropzone;
  const backgroundColor = isDragAccept ? 'blue' : '#fafafa';
  return (
    <div
      {...getRootProps({
        style: {
          padding: '32px',
          backgroundColor,
          border: '1px dashed gray',
          color: 'gray',
          borderRadius: '4px',
        },
      })}
    >
      <input {...getInputProps()} />
      <Typography>Drag and drop map image, or click to select...</Typography>
    </div>
  );
};

export default ImageDrop;
