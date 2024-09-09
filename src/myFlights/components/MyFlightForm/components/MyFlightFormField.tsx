import { MyFlightAttributes } from '@/myFlights/types';

import DateInput from '@/common/components/DatePickers/DateInput';
import FreeAutoComplete from '@/common/components/FreeAutoComplete';
import ClearableInput from '@/common/components/ClearableInput';

import MyFlightFormFieldProps from '../types';

const MyFlightFormField = ({
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
}: MyFlightFormFieldProps & {
  state: Partial<MyFlightAttributes>;
  setValue: (key: string, value: string | number | null) => void;
  loadedValues: Partial<MyFlightAttributes>;
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
  return (
    <ClearableInput
      value={value}
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

export default MyFlightFormField;
