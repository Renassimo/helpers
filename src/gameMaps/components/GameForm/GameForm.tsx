import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import ImagePicker from '@/common/components/ImagePicker';
import ColorPicker from '@/common/components/ColorPicker';
import Button from '@mui/material/Button';

import { GameFormProps } from '@/gameMaps/types/props';

const GameForm = ({
  values,
  setters,
  errors = {},
  onDelete,
}: GameFormProps) => {
  const { title, description, backgroundColor, mapImageUrl } = values;
  const { setTitle, setDescription, setBackgroundColor, setMapImage } = setters;

  return (
    <>
      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        fullWidth
        margin="dense"
        variant="standard"
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        fullWidth
        multiline
        margin="dense"
        variant="standard"
        error={!!errors.description}
        helperText={errors.description}
      />
      <ColorPicker
        name="backgroundColor"
        label="Map background color"
        value={backgroundColor}
        onChange={setBackgroundColor}
        error={errors.backgroundColor}
      />
      <ImagePicker defaultUrlValue={mapImageUrl} onChange={setMapImage} />
      {onDelete && (
        <Button
          type="button"
          fullWidth
          variant="outlined"
          onClick={onDelete}
          color="error"
        >
          Delete
        </Button>
      )}
      {errors.main && <Alert severity="error">{errors.main}</Alert>}
    </>
  );
};

export default GameForm;
