import { useMemo } from 'react';
import {
  getDayText,
  getNextDayCode,
  getPrevDayCode,
  getYear,
} from '@/common/utils/dayjs';
import dayjs from 'dayjs';
import { getIsoMonthDayFromDayCode } from '@/fiveBook/utils';
import { FiveBookData } from '@/types/fiveBook';

const useFiveBookData = (data: FiveBookData | null) => {
  const currentYear = useMemo(() => getYear(), []);

  const dayData = useMemo(() => {
    if (!data)
      return {
        id: '',
        dayCode: '',
        question: '',
        answers: [],
        yearOptions: [],
        day: null,
        fiveBookDay: null,
        prevFiveBookDayCode: null,
        nextFiveBookDayCode: null,
        fiveBookDayText: '',
      };

    const dayCode = data.attributes.dayCode;
    const isoMonthDay = getIsoMonthDayFromDayCode(dayCode);
    const day = dayjs(`${currentYear}-${isoMonthDay}`);
    const fiveBookDay = dayjs(`2020-${isoMonthDay}`);
    const prevFiveBookDayCode = getPrevDayCode(fiveBookDay);
    const nextFiveBookDayCode = getNextDayCode(fiveBookDay);
    const fiveBookDayText = getDayText(fiveBookDay);

    const answers = Object.entries(data.attributes.answers).map(
      ([key, value]) => ({ year: key, value: value })
    );

    const yearOptions = Object.keys(data.attributes.answers)
      .filter((key) => !data.attributes.answers[key] && +key <= +currentYear)
      .reverse();

    return {
      id: data.id,
      dayCode: data.attributes.dayCode,
      question: data.attributes.question,
      emoji: data.attributes.emoji,
      answers,
      yearOptions,
      day,
      fiveBookDay,
      prevFiveBookDayCode,
      nextFiveBookDayCode,
      fiveBookDayText,
    };
  }, [data, currentYear]);

  return {
    currentYear,
    ...dayData,
  };
};

export default useFiveBookData;
