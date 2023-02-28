const getTurboModeAnswers = (
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

export default getTurboModeAnswers;
