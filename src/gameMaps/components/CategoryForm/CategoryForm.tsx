import { useEffect, useRef } from 'react';

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import ColorPicker from '@/common/components/ColorPicker';
import Button from '@mui/material/Button';

import { CategoryFormProps } from '@/gameMaps/types/props';

const CategoryForm = ({
  values,
  setters,
  errors = {},
  onDelete,
  isReady = false,
}: CategoryFormProps) => {
  const { title, description, color, itemsAmount } = values;
  const { setTitle, setDescription, setColor, setItemsAmount } = setters;

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
        fullWidth
        inputRef={inputRef}
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
      <TextField
        name="itemsAmount"
        label="Items Amount"
        type="number"
        value={itemsAmount > 0 ? itemsAmount : ''}
        onChange={(event) => setItemsAmount(+event.target.value)}
        fullWidth
        margin="dense"
        variant="standard"
        error={!!errors.itemsAmount}
        helperText={errors.itemsAmount}
      />
      <ColorPicker
        name="color"
        label="Color"
        value={color}
        onChange={setColor}
        error={errors.color}
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

export default CategoryForm;
