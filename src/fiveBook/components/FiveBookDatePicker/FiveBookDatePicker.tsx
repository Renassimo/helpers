import { useCallback } from 'react';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';

import { getDayCode } from '@/common/utils/dayjs';

import DatePicker from '@/common/components/DatePickers/DatePicker';

import useFiveBook from '@/fiveBook/hooks/useFiveBook';

const FiveBookDatePicker = ({
  onChange,
  staticPicker = false,
}: {
  onChange?: (event: Dayjs | null) => Promise<boolean>;
  staticPicker?: boolean;
}) => {
  const { day } = useFiveBook();

  const { push } = useRouter();
  const onDatePickerChanged = useCallback(
    (event: Dayjs | null) => push(`/5book/${getDayCode(event)}`),
    [push]
  );

  return (
    <DatePicker
      staticPicker={staticPicker}
      openTo="day"
      views={['month', 'day']}
      dayValue={day}
      onChange={onChange ?? onDatePickerChanged}
    />
  );
};

export default FiveBookDatePicker;
