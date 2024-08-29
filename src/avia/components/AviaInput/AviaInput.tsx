import { KeyboardEvent, ReactNode } from 'react';

import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const AviaInput = ({
  title,
  placeholder,
  label,
  value,
  setValue,
  disabled,
  onKeyDown,
  adornments,
}: {
  title: string;
  placeholder?: string;
  label?: string;
  value: string;
  setValue: (value: string) => void;
  disabled: boolean;
  onKeyDown?: (event: KeyboardEvent) => void;
  adornments: ReactNode;
}) => {
  return (
    <FormControl fullWidth variant="standard">
      {label && <InputLabel>{label}</InputLabel>}
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        size="small"
        disabled={disabled}
        placeholder={placeholder ?? title}
        aria-label={title}
        fullWidth
        onKeyDown={onKeyDown}
        endAdornment={
          <InputAdornment position="end">
            <>
              {adornments}
              {value && (
                <IconButton
                  size="small"
                  aria-label="Clear"
                  onClick={() => setValue('')}
                  disabled={disabled}
                  edge="end"
                >
                  {<CloseIcon />}
                </IconButton>
              )}
            </>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default AviaInput;
