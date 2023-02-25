import { ClientAnswer } from '@/types/fiveBook';

export const getIsoMonthDayFromDayCode = (rawDayCode: string) => {
  const splitDayCode = rawDayCode.split('');
  const dayCode = +rawDayCode;
  return dayCode > 1000
    ? `${splitDayCode[0]}${splitDayCode[1]}-${splitDayCode[2]}${splitDayCode[3]}`
    : `0${splitDayCode[0]}-${splitDayCode[1]}${splitDayCode[2]}`;
};

export const getChangedAnswers = (
  original: ClientAnswer[] = [],
  changed: Record<string, string> = {},
  onlyCreate = true
) => {
  if (original.length === 0 || !changed) return null;
  const changedAnswers = Object.entries(changed).reduce(
    (result, [key, value]) => {
      const originalAnswer = original.find(({ year }) => year === key);

      if (!originalAnswer) return result;
      if (onlyCreate && originalAnswer?.value) return result;
      if (originalAnswer?.value === value) return result;

      return {
        ...result,
        [key]: { value },
      };
    },
    {}
  );
  return Object.keys(changedAnswers).length > 0 ? changedAnswers : null;
};

export const getTurboModeAnswers = (
  answer: string,
  yearOptions: string[],
  year: string
) => {
  const answers = answer.split('\n\n');
  const currentYearIndex = yearOptions.findIndex((option) => option === year);
  const payloadYears = yearOptions.slice(currentYearIndex);
  return answers.reduce((result, answer, index) => {
    const year = payloadYears[index];
    if (!year) return result;
    return {
      ...result,
      [year]: answer,
    };
  }, {});
};
