import { createContext, Dispatch, SetStateAction } from 'react';
import { Dayjs } from 'dayjs';

import { ClientAnswer, FiveBookData } from '@/types/fiveBook';

const FiveBookContext = createContext<{
  currentYear: string | null;
  setData: Dispatch<SetStateAction<FiveBookData | null>>;
  id: string;
  emoji?: string;
  dayCode: string;
  question: string | null;
  answers: ClientAnswer[];
  yearOptions: string[];
  day: Dayjs | null;
  fiveBookDay: Dayjs | null;
  prevFiveBookDayCode: string | null;
  nextFiveBookDayCode: string | null;
  fiveBookDayText: string;
}>({
  currentYear: null,
  setData: () => {},
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
});

export default FiveBookContext;
