import {
  addDay,
  formatFromNotionDate,
  formatToNotionDate,
  getDayCode,
  getDayText,
  getNextDayCode,
  getPrevDayCode,
  getYear,
  isSameDay,
  isValidDate,
  showReadableDate,
  showTimePassed,
  showWhen,
  substractDay,
} from '@/common/utils/dayjs/dayjs';
import dayjs from 'dayjs';

describe('DayJS', () => {
  const date = dayjs('2020-02-11');

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2020, 1, 11));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

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

  describe('showTimePassed', () => {
    test('returns formatted relative date', () => {
      // Arrange
      const expectedResult = '8 years';
      // Act
      const result = showTimePassed('2011-11-11');
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('isValidDate', () => {
    test('returns validity', () => {
      // Arrange
      const expectedResult = true;
      // Act
      const result = isValidDate(dayjs('2011-11-11'));
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('showReadableDate', () => {
    test('returns readable date string', () => {
      // Arrange
      const expectedResult = '11 Nov 2011';
      // Act
      const result = showReadableDate(dayjs('2011-11-11'));
      // Assert
      expect(result).toEqual(expectedResult);
    });

    describe('when invalid date passed', () => {
      test('returns empty string', () => {
        // Arrange
        const expectedResult = '';
        // Act
        const result = showReadableDate();
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('isSameDay', () => {
    test('returns result', () => {
      // Arrange
      const expectedResult = true;
      // Act
      const result = isSameDay('2011-11-11', '2011-11-11');
      // Assert
      expect(result).toEqual(expectedResult);
    });

    describe('when nulls passed', () => {
      test('returns result', () => {
        // Arrange
        const expectedResult = false;
        // Act
        const result = isSameDay(null, null);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when dyjs dates passed', () => {
      test('returns result', () => {
        // Arrange
        const expectedResult = true;
        // Act
        const result = isSameDay(dayjs('2011-11-11'), dayjs('11 Nov 2011'));
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('addDay', () => {
    test('returns result', () => {
      // Arrange
      const expectedResult = '2011-11-12';
      // Act
      const result = addDay(dayjs('2011-11-11'));
      // Assert
      expect(result.format('YYYY-MM-DD')).toEqual(expectedResult);
    });
  });

  describe('substractDay', () => {
    test('returns result', () => {
      // Arrange
      const expectedResult = '2011-11-10';
      // Act
      const result = substractDay(dayjs('2011-11-11'));
      // Assert
      expect(result.format('YYYY-MM-DD')).toEqual(expectedResult);
    });
  });
});
