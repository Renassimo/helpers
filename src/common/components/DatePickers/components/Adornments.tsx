import { Dayjs } from 'dayjs';

import { addDay, substractDay } from '@/common/utils/dayjs';
import pasteText from '@/common/utils/clipboard/pasteText';

import InputAdornment from '@mui/material/InputAdornment';

import CalendarInputAdornment from './CalendarInputAdornment';
import Adornment, { AdornmentProps } from './Adornment';

type OnDayChangeProp = Dayjs | null | string;

export const INPUT_VALUE = 'INPUT_VALUE';
export const ORIGINAL_VALUE = 'ORIGINAL_VALUE';

const Adornments = ({
  showChangeDate,
  showRefresh,
  hasValue,
  disabled = false,
  onDayChange,
  day,
}: {
  showChangeDate: boolean;
  showRefresh: boolean;
  hasValue: boolean;
  disabled?: boolean;
  onDayChange: (day?: OnDayChangeProp) => void;
  day: Dayjs;
}) => {
  const adornments: (AdornmentProps | false)[] = [
    showChangeDate && {
      label: 'Change date',
      onClick: () => onDayChange(INPUT_VALUE),
    },
    showRefresh && {
      label: 'Refresh',
      onClick: () => {
        onDayChange(ORIGINAL_VALUE);
      },
    },
    {
      label: 'Paste date',
      onClick: async () => {
        const pastedValue = await pasteText();
        onDayChange(pastedValue);
      },
    },
    hasValue && {
      label: 'Prev day',
      onClick: () => onDayChange(substractDay(day)),
    },
    {
      label: 'Today',
      onClick: () => onDayChange(),
    },
    hasValue && {
      label: 'Next day',
      onClick: () => onDayChange(addDay(day)),
    },
    {
      dayValue: day,
      onChange: onDayChange,
    },
    hasValue && {
      label: 'Clear date',
      onClick: () => onDayChange(null),
    },
  ];

  return (
    <InputAdornment position="end">
      {adornments.map((props, index) => {
        if (!props) return null;
        if (props.dayValue && props.onChange)
          return (
            <CalendarInputAdornment
              dayValue={props.dayValue}
              onChange={props.onChange}
              disabled={disabled}
              key={index}
            />
          );
        return (
          <Adornment
            {...props}
            key={props.label ?? index}
            disabled={disabled}
          />
        );
      })}
    </InputAdornment>
  );
};

export default Adornments;
