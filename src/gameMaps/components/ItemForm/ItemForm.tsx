import { useEffect, useRef } from 'react';

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import { ItemFormProps } from '@/gameMaps/types/props';

const ItemForm = ({
  values,
  setters,
  errors = {},
  onDelete,
  isReady = false,
}: ItemFormProps) => {
  const { description, collected } = values;
  const { setDescription, setCollected } = setters;

  const inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (isReady) inputRef?.current?.focus();
  }, [isReady]);

  return (
    <>
      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        inputRef={inputRef}
        fullWidth
        multiline
        margin="dense"
        variant="standard"
        error={!!errors.description}
        helperText={errors.description}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={collected}
            onChange={(event) => setCollected(event?.target.checked)}
          />
        }
        label="Collected"
      />
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

export default ItemForm;
