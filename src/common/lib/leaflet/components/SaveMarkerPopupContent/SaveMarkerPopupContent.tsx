import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SaveMarkerPopupContent = ({
  onAdd,
  onCancel,
  text = 'Add item to map?',
}: {
  onAdd: () => void;
  onCancel: () => void;
  text?: string;
}) => {
  return (
    <Box>
      <Typography>{text}</Typography>
      <Box>
        <Button
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            onAdd();
          }}
        >
          Yes
        </Button>
        <Button
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            onCancel();
          }}
          color="error"
        >
          No
        </Button>
      </Box>
    </Box>
  );
};

export default SaveMarkerPopupContent;
