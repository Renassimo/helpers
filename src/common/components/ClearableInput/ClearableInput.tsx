import FormControl from '@mui/material/FormControl';
import Input, { InputProps } from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const ClearableInput = ({
  setValue,
  value,
  fullWidth = false,
  placeholder,
  label,
  type,
  disabled = false,
  originalValue,
  inputProps = {},
}: {
  setValue: (value: string | number | null) => void;
  value?: string | number | null;
  fullWidth?: boolean;
  placeholder?: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  originalValue?: number | string | null;
  inputProps?: InputProps;
}) => {
  return (
    <FormControl fullWidth={fullWidth}>
      {label && <InputLabel variant="standard">{label}</InputLabel>}
      <Input
        {...inputProps}
        type={type}
        placeholder={placeholder}
        aria-label={inputProps['aria-label'] ?? label ?? placeholder}
        value={value ?? ''}
        fullWidth={fullWidth}
        disabled={disabled}
        onChange={(event) => setValue(event.target.value)}
        endAdornment={
          <InputAdornment position="end">
            {originalValue && originalValue !== value && (
              <IconButton
                aria-label={'Refresh'}
                onClick={() => setValue(originalValue ?? null)}
                edge="end"
              >
                {<RestartAltIcon />}
              </IconButton>
            )}
            {type === 'url' && value && (
              <IconButton
                aria-label={'url'}
                href={value as string}
                target="_blank"
                edge="end"
              >
                {<OpenInNewIcon />}
              </IconButton>
            )}
            {value && !disabled && (
              <IconButton
                aria-label="Clear"
                onClick={() => setValue('')}
                edge="end"
              >
                {<CloseIcon />}
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default ClearableInput;
