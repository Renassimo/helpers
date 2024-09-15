import { useState, KeyboardEvent, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import {
  formatToNotionDate,
  isSameDay,
  isValidDate,
  showReadableDate,
} from '@/common/utils/dayjs';

import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

import Adornments, {
  INPUT_VALUE,
  ORIGINAL_VALUE,
} from '../components/Adornments';

export interface DateInputProps {
  value?: string | null;
  setValue: (value: string | null) => void;
  fullWidth?: boolean;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  ariaLabel?: string;
  originalValue?: string | null;
}

const DateInput = ({
  value,
  setValue,
  fullWidth = false,
  disabled = false,
  placeholder,
  label,
  ariaLabel,
  originalValue,
}: DateInputProps) => {
  const day: Dayjs = dayjs(value);
  const isValidDay = isValidDate(day);

  const [inputValue, setInputValue] = useState(showReadableDate(day));

  useEffect(() => {
    setInputValue(showReadableDate(day));
  }, [value]);

  const setStringyDate = (day?: string | null) => {
    const d: Dayjs = dayjs(day);
    setValue(isValidDate(d) ? formatToNotionDate(d) : null);
  };

  const onDayChange = (day?: Dayjs | null | string) => {
    if (typeof day === 'undefined') {
      setValue(formatToNotionDate(dayjs()));
    } else if (day === INPUT_VALUE) {
      setStringyDate(inputValue);
    } else if (day === ORIGINAL_VALUE) {
      setStringyDate(originalValue);
    } else if (typeof day === 'string') {
      setStringyDate(day);
    } else if (day === null) {
      setValue(null);
    } else {
      setValue(formatToNotionDate(day));
    }
  };

  const onEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      onDayChange(inputValue);
    }
  };

  const showChangeDate = !!(inputValue && !isSameDay(day, inputValue));
  const showRefresh = !!(originalValue && originalValue !== value);

  return (
    <>
      <FormControl fullWidth={fullWidth}>
        {label && <InputLabel variant="standard">{label}</InputLabel>}
        <Input
          size="small"
          aria-label={ariaLabel ?? label ?? placeholder}
          placeholder={placeholder}
          value={inputValue}
          fullWidth={fullWidth}
          disabled={disabled}
          onChange={(event) => setInputValue(event.target.value)}
          onBlur={(event) => onDayChange(event.target.value)}
          onKeyDown={onEnter}
          endAdornment={
            <Adornments
              day={day}
              showChangeDate={showChangeDate}
              showRefresh={showRefresh}
              hasValue={!!value}
              onDayChange={onDayChange}
              disabled={disabled}
            />
          }
        />
        {!isValidDay && value && (
          <FormHelperText error={!isValidDay} variant="standard">
            Date is not valid
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default DateInput;
