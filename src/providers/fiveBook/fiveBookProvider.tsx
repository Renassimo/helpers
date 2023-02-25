import { ReactNode, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

import FiveBookContext from '@/contexts/fiveBook';

import { FiveBookData } from '@/types/fiveBook';

import { getNextDayCode, getPrevDayCode, getYear } from '@/utils/dayjs';
import { getIsoMonthDayFromDayCode } from '@/utils/fiveBook';

const FiveBookProvider = ({
  children,
  data: apiData,
}: {
  children: ReactNode;
  data: FiveBookData;
}) => {
  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);
  }, [apiData]);

  const currentYear = useMemo(() => String(getYear()), []);

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

    const dayCode = data.attributes.dayCode.value;
    const day = dayjs(`${currentYear}-${getIsoMonthDayFromDayCode(dayCode)}`);
    const fiveBookDay = dayjs(`2020-${getIsoMonthDayFromDayCode(dayCode)}`);
    const prevFiveBookDayCode = getPrevDayCode(fiveBookDay);
    const nextFiveBookDayCode = getNextDayCode(fiveBookDay);
    const fiveBookDayText = dayjs(fiveBookDay).format('D MMMM');

    const answers = Object.entries(data.attributes.answers).map(
      ([key, { value }]) => ({ year: key, value: value })
    );

    const yearOptions = Object.keys(data.attributes.answers)
      .filter(
        (key) => !data.attributes.answers[key].value && +key <= +currentYear
      )
      .reverse();

    return {
      id: data.id,
      dayCode: data.attributes.dayCode.value,
      question: data.attributes.question.value,
      answers,
      yearOptions,
      day,
      fiveBookDay,
      prevFiveBookDayCode,
      nextFiveBookDayCode,
      fiveBookDayText,
    };
  }, [data, currentYear]);

  const value = {
    currentYear,
    setData,
    ...dayData,
  };

  return (
    <FiveBookContext.Provider value={value}>
      {children}
    </FiveBookContext.Provider>
  );
};

export default FiveBookProvider;
