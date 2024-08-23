import {
  formatFromNotionDate,
  formatToNotionDate,
  getDayCode,
  getDayText,
  getNextDayCode,
  getPrevDayCode,
  getYear,
  showWhen,
} from '@/common/utils/dayjs/dayjs';
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

  describe('getDayText', () => {
    test('returns dayText', () => {
      // Arrange
      const expectedResult = '11 February';
      // Act
      const result = getDayText(date);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('formatFromNotionDate', () => {
    test('returns formatted date', () => {
      // Arrange
      const expectedResult = '13.11.2000';
      // Act
      const result = formatFromNotionDate('2000-11-13');
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('formatToNotionDate', () => {
    test('returns formatted date', () => {
      // Arrange
      const expectedResult = '2000-11-13';
      // Act
      const result = formatToNotionDate('13 Nov 2000');
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('showWhen', () => {
    test('returns formatted date', () => {
      // Arange
      const expectedResult = 'Wed Apr 1 2020';
      // Act
      const result = showWhen(
        'Wed Apr 01 2020 00:00:00 GMT+0000 (Coordinated Universal Time)'
      );
      // Assert
      expect(result).toEqual(expectedResult);
    });

    describe('when called without weekDay', () => {
      test('returns formatted date', () => {
        // Arange
        const expectedResult = 'Apr 1 2020';
        // Act
        const result = showWhen(
          'Wed Apr 01 2020 00:00:00 GMT+0000 (Coordinated Universal Time)',
          false
        );
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
