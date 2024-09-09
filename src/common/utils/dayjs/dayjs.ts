import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const dateFormat = 'YYYY-MM-DD';
const notionFormat = 'YYYY-MM-DD';
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
export const formatFromNotionDate = (date: string | null) =>
  dayjs(date).format('DD.MM.YYYY');
export const formatToNotionDate = (date?: string | Dayjs | null) =>
  dayjs(date).format(notionFormat);
export const showWhen = (dateString: string, withWeekDay = true) => {
  const date = new Date(dateString);
  return dayjs(date).format(`${withWeekDay ? 'ddd ' : ''}MMM D YYYY`);
};
export const showTimePassed = (dateString: string) =>
  dayjs(dateString).toNow(true);
export const isValidDate = (date?: Dayjs): boolean => {
  return !!date?.isValid();
};
export const showReadableDate = (date?: Dayjs): string => {
  return date?.isValid() ? date?.format('D MMM YYYY') : '';
};
export const isSameDay = (
  d1: Dayjs | string | null,
  d2: Dayjs | string | null
): boolean => {
  if (typeof d1 === 'string' || d1 === null) return dayjs(d1).isSame(d2, 'day');
  return d1.isSame(d2, 'day');
};
export const addDay = (day: Dayjs): Dayjs => day.add(1, 'd');
export const substractDay = (day: Dayjs): Dayjs => day.subtract(1, 'd');
