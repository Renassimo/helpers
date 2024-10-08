import { useEffect, useRef } from 'react';

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { PlayFormProps } from '@/gameMaps/types/props';

const PlayForm = ({
  values,
  setters,
  errors = {},
  onDelete,
  isReady = false,
}: PlayFormProps) => {
  const { title, description } = values;
  const { setTitle, setDescription } = setters;

  const inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (isReady) inputRef?.current?.focus();
  }, [isReady]);

  return (
    <>
      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        inputRef={inputRef}
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
      {onDelete && (
        <Button
          type="button"
          fullWidth
          variant="outlined"
          onClick={onDelete}
          color="error"
          sx={{ marginTop: 3 }}
        >
          Delete
        </Button>
      )}
      {errors.main && <Alert severity="error">{errors.main}</Alert>}
    </>
  );
};

export default PlayForm;
