import {
  getDayCode,
  getNextDayCode,
  getPrevDayCode,
  getYear,
} from '@/utils/dayjs/dayjs';
import dayjs from 'dayjs';

describe('DayJS', () => {
  const date = dayjs('2020-02-11');

  describe('getYear', () => {
    test('returns year', () => {
      // Arrange
      const expectedResult = '2020';
      // Act
      const result = getYear(date);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getDayCode', () => {
    test('returns dayCode', () => {
      // Arrange
      const expectedResult = '211';
      // Act
      const result = getDayCode(date);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getNextDayCode', () => {
    test('returns nextDayCode', () => {
      // Arrange
      const expectedResult = '212';
      // Act
      const result = getNextDayCode(date);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getPrevDayCode', () => {
    test('returns prevDayCode', () => {
      // Arrange
      const expectedResult = '210';
      // Act
      const result = getPrevDayCode(date);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
