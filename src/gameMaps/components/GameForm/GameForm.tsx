import TextField from '@mui/material/TextField';

import ImagePicker from '@/common/components/ImagePicker';
import ColorPicker from '@/common/components/ColorPicker';

import { GameFormProps } from '@/motivationPoll/types/props';

const GameForm = ({ values, setters }: GameFormProps) => {
  const { title, description, backgroundColor, mapImageUrl, mapImage } = values;
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
      />
      <ColorPicker
        name="backgroundColor"
        label="Map background color"
        value={backgroundColor}
        onChange={setBackgroundColor}
      />
      <ImagePicker
        imageFile={mapImage}
        setImageFile={setMapImage}
        imageUrl={mapImageUrl}
      />
    </>
  );
};

export default GameForm;
