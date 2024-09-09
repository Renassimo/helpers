import { useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { getMuiColor } from '@/common/utils/mui';

import { Matcher } from '@/common/types/matchers';

export interface FreeAutoCompleteProps {
  setValue: (newValue: string | null) => void;
  options: string[];
  value?: string | null;
  label?: string;
  originalValue?: string | null;
  matchers?: Matcher;
}

const FreeAutoComplete = ({
  setValue,
  options = [],
  value,
  label,
  originalValue,
  matchers,
}: FreeAutoCompleteProps) => {
  const isValueFoundInOptions = !!options.find((option) => option === value);
  const [color, sxColor] = getMuiColor(!!value, isValueFoundInOptions);

  const onChange = (_: unknown, newValue: string | null) => setValue(newValue);

  const helperText = originalValue && value !== originalValue && (
    <span style={{ display: 'block' }} onClick={() => setValue(originalValue)}>
      {originalValue}
    </span>
  );

  const fuse = useMemo(
    () =>
      new Fuse(options as string[], {
        includeScore: true,
      }),
    [options]
  );

  useEffect(() => {
    if (!originalValue) return;
    if (originalValue === value) return;

    if (matchers?.[originalValue]) {
      setValue(matchers[originalValue]);
      return;
    }

    const [found] = fuse.search(originalValue);
    if (!found) return;

    const { score } = found;

    if (typeof score !== 'number') return;
    if (score > 0.52) return;

    setValue(found.item);
  }, [originalValue]);

  return (
    <Autocomplete
      value={value ?? ''}
      options={options}
      onInputChange={onChange}
      onChange={onChange}
      size="small"
      disablePortal
      freeSolo
      blurOnSelect
      clearOnBlur
      sx={{ my: 1, color: sxColor }}
      filterOptions={(options, params) => {
        const { inputValue } = params;

        if (inputValue.length === 0) return options;

        return fuse.search(inputValue).map(({ item }) => item);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          color={color}
          label={label}
          fullWidth
          helperText={helperText}
          FormHelperTextProps={{
            sx: { color: 'warning.dark', cursor: 'pointer' },
          }}
          sx={{
            input: { color: sxColor },
          }}
        />
      )}
    />
  );
};

export default FreeAutoComplete;
