import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

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
export const formatFromNotionDate = (date: string | null) =>
  dayjs(date).format('DD.MM.YYYY');
export const formatToNotionDate = (date?: string | Dayjs | null) =>
  dayjs(date).format('YYYY-MM-DD');
export const showWhen = (dateString: string, withWeekDay = true) => {
  const date = new Date(dateString);
  return dayjs(date).format(`${withWeekDay ? 'ddd ' : ''}MMM D YYYY`);
};
export const showTimePassed = (dateString: string) =>
  dayjs(dateString).toNow(true);
