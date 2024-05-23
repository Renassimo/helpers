import getIsoMonthDayFromDayCode from '@/fiveBook/utils/getIsoMonthDayFromDayCode';

describe('getIsoMonthDayFromDayCode', () => {
  describe('when got 3 digits dayCode', () => {
    test('returns iso month-date', () => {
      // Arrange
      const dayCode = '123';
      // Act
      const result = getIsoMonthDayFromDayCode(dayCode);
      // Assert
      expect(result).toEqual('01-23');
    });
  });

  describe('when got 4 digits dayCode', () => {
    test('returns iso month-date', () => {
      // Arrange
      const dayCode = '1123';
      // Act
      const result = getIsoMonthDayFromDayCode(dayCode);
      // Assert
      expect(result).toEqual('11-23');
    });
  });
});
