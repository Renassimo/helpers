import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Avia } from '@/avia/types/avia';

import DateInput from '@/common/components/DatePickers/DateInput';
import FreeAutoComplete from '@/common/components/FreeAutoComplete';
import ClearableInput from '@/common/components/ClearableInput';

const AviaFormField = <
  Attributes extends Record<string, string | number | boolean | null>
>({
  name,
  label,
  options,
  matchers,
  type,
  disabled,
  isDate,
  state,
  setValue,
  loadedValues,
}: Avia.FormFieldProps<Attributes> & {
  state: Partial<Attributes>;
  setValue: (key: string, value: string | number | boolean | null) => void;
  loadedValues: Partial<Attributes>;
}) => {
  const value = state[name];

  if (options)
    return (
      <FreeAutoComplete
        value={value as string | null}
        setValue={(newValue) => setValue(name, newValue)}
        label={label}
        options={options ?? []}
        originalValue={loadedValues[name] as string | null}
        matchers={matchers}
      />
    );

  if (isDate)
    return (
      <DateInput
        value={typeof value === 'string' ? value : ''}
        setValue={(newValue) => setValue(name, newValue)}
        label={label}
        disabled={disabled}
        originalValue={loadedValues[name] as string | null}
        fullWidth
      />
    );

  if (type === 'checkbox')
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={!!(loadedValues[name] || value) as boolean}
            onChange={(event) => setValue(name, event?.target.checked)}
          />
        }
        label={label}
      />
    );

  return (
    <ClearableInput
      value={value as number | string | null}
      setValue={(value) => setValue(name, value)}
      label={label}
      type={type}
      originalValue={loadedValues[name] as number | string | null}
      disabled={disabled}
      fullWidth
      inputProps={{
        size: 'small',
      }}
    />
  );
};

export default AviaFormField;
