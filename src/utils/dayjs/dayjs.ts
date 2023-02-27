import dayjs, { Dayjs } from 'dayjs';

const dateFormat = 'YYYY-MM-DD';
const yearFormat = 'YYYY';
const dayCodeFormat = 'MDD';
const dayTextFormat = 'D MMMM';

export const getYear = (date?: Dayjs) => dayjs(date).format(yearFormat);
export const getDayCode = (date?: Dayjs | null) =>
  dayjs(date).format(dayCodeFormat);
export const getNextDayCode = (date?: Dayjs) =>
  dayjs(date, dateFormat).add(1, 'day').format(dayCodeFormat);
export const getPrevDayCode = (date?: Dayjs) =>
  dayjs(date, dateFormat).subtract(1, 'day').format(dayCodeFormat);
export const getDayText = (date?: Dayjs) => dayjs(date).format(dayTextFormat);
