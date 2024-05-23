import { useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';

import { getDayCode } from '@/utils/dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import useFiveBook from '@/fiveBook/hooks/useFiveBook';

const EndAdornmentWrapper = styled.div`
  & div {
    margin: 0;
    & button {
      margin: 0;
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DatePicker = ({
  onChange,
  staticPicker = false,
}: {
  onChange?: (event: Dayjs | null) => Promise<boolean>;
  staticPicker?: boolean;
}) => {
  const { day } = useFiveBook();

  const endAdornmentContainerRef = useRef(null);

  const { push } = useRouter();
  const onDatePickerChanged = useCallback(
    (event: Dayjs | null) => push(`/5book/${getDayCode(event)}`),
    [push]
  );

  const onDateClick = () => {
    // @ts-ignore
    const child1 = endAdornmentContainerRef?.current?.children[0];
    const child2 = child1?.children[0];
    child2?.click();
    child1?.click();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {staticPicker ? (
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={day}
          views={['month', 'day']}
          onChange={onChange ?? onDatePickerChanged}
          renderInput={(params) => <TextField {...params} />}
        />
      ) : (
        <MUIDatePicker
          openTo="day"
          value={day}
          views={['month', 'day']}
          onChange={onChange ?? onDatePickerChanged}
          renderInput={(params) => (
            <>
              <div style={{ display: 'none' }} ref={endAdornmentContainerRef}>
                {params.InputProps?.endAdornment}
                <input {...params.inputProps} />
              </div>
              <EndAdornmentWrapper ref={params.inputRef}>
                <IconButton onClick={onDateClick}>
                  <CalendarMonthIcon />
                </IconButton>
              </EndAdornmentWrapper>
            </>
          )}
        />
      )}
    </LocalizationProvider>
  );
};

export default DatePicker;
