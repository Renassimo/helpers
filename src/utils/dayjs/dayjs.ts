import dayjs, { Dayjs } from 'dayjs';

const dateFormat = 'YYYY-MM-DD';
const monthDayFormat = 'MM-DD';
const displayFormat = 'D MMMM';
const dayCodeFormat = 'MDD';

export const getYear = () => dayjs().year();
export const getNextDayForQuery = (date = undefined) =>
  dayjs(date, dateFormat).add(1, 'day').format(monthDayFormat);
export const getPrevDayForQuery = (date = undefined) =>
  dayjs(date, dateFormat).subtract(1, 'day').format(monthDayFormat);
export const getCurrentDayForQuery = () => dayjs().format(monthDayFormat);
export const getDayForQuery = (date = undefined) =>
  dayjs(date).format(monthDayFormat);
export const getDateToDisplay = (date = undefined) =>
  dayjs(date, dateFormat).format(displayFormat);
export const getDateToFetchData = (date = undefined) =>
  `2020-${dayjs(date, dateFormat).format(monthDayFormat)}`;
export const getDateToFetchDataFromQuery = (date: string) =>
  dayjs(`2020-${date}`, dateFormat).format(dateFormat);
export const getDayCode = (date?: Dayjs | null) =>
  dayjs(date).format(dayCodeFormat);
export const getNextDayCode = (date?: Dayjs) =>
  dayjs(date, dateFormat).add(1, 'day').format(dayCodeFormat);
export const getPrevDayCode = (date?: Dayjs) =>
  dayjs(date, dateFormat).subtract(1, 'day').format(dayCodeFormat);
