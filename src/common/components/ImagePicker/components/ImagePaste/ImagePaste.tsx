import Button from '@mui/material/Button';

const ImagePaste = ({ onPaste }: { onPaste: () => void }) => {
  return (
    <Button type="button" fullWidth variant="outlined" onClick={onPaste}>
      ...Or paste from clipboard
    </Button>
  );
};

export default ImagePaste;
