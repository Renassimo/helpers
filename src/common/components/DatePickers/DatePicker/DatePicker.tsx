import { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';

import TextField from '@mui/material/TextField';

import renderFakeInput from '@/common/components/DatePickers/components/renderFakeInput';

type View = 'year' | 'month' | 'day';

export interface DatePickerProps {
  onChange: (event: Dayjs | null) => Promise<boolean> | void;
  dayValue: Dayjs | null;
  views?: View[];
  openTo?: View;
  staticPicker?: boolean;
}

const DatePicker = ({
  onChange,
  dayValue,
  views = ['year', 'month', 'day'],
  openTo = 'day',
  staticPicker = false,
}: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      {staticPicker ? (
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo={openTo}
          value={dayValue}
          views={views}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      ) : (
        <MUIDatePicker
          openTo={openTo}
          value={dayValue}
          views={views}
          onChange={onChange}
          renderInput={(props) => renderFakeInput(props)}
        />
      )}
    </LocalizationProvider>
  );
};

export default DatePicker;
