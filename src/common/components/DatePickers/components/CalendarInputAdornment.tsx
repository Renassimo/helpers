import { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';

import renderFakeInput from './renderFakeInput';

type View = 'year' | 'month' | 'day';

export const CalendarInputAdornment = ({
  dayValue,
  views = ['year', 'month', 'day'],
  openTo = 'day',
  onChange,
  disabled = false,
}: {
  dayValue: Dayjs;
  views?: View[];
  openTo?: View;
  onChange: (dayValue: Dayjs | null) => void;
  disabled?: boolean;
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <MUIDatePicker
        openTo={openTo}
        value={dayValue}
        views={views}
        onChange={onChange}
        renderInput={(props) => renderFakeInput(props, disabled)}
      />
    </LocalizationProvider>
  );
};

export default CalendarInputAdornment;
