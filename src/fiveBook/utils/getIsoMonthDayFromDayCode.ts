const getIsoMonthDayFromDayCode = (rawDayCode: string) => {
  const splitDayCode = rawDayCode.split('');
  const dayCode = +rawDayCode;
  return dayCode > 1000
    ? `${splitDayCode[0]}${splitDayCode[1]}-${splitDayCode[2]}${splitDayCode[3]}`
    : `0${splitDayCode[0]}-${splitDayCode[1]}${splitDayCode[2]}`;
};

export default getIsoMonthDayFromDayCode;
