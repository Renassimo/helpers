import useFiveBookData from '@/providers/fiveBook/hooks/useFiveBookData';
import { FiveBookData } from '@/types/fiveBook';
import {
  getDayText,
  getNextDayCode,
  getPrevDayCode,
  getYear,
} from '@/utils/dayjs';
import { renderHook } from '@testing-library/react';
import { getIsoMonthDayFromDayCode } from '@/utils/fiveBook';
import dayjs from 'dayjs';

jest.mock('@/utils/dayjs');
jest.mock('@/utils/fiveBook');

describe('useFiveBookData', () => {
  const mockedCurrentYear = '2022';

  beforeEach(() => {
    (getYear as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => mockedCurrentYear)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns day data', () => {
    // Arrange
    const data = {
      id: 'ID',
      attributes: {
        dayCode: '203',
        question: 'Wsup?',
        emoji: '⛺️',
        answers: {
          '2012': 'Fine!',
          '2020': 'Good!',
          '2021': null,
        },
      },
    };

    const mockedIsoMonthDayFromDayCode = '03-02';
    const mockedPrevDayCode = '103';
    const mockedNextDayCode = '303';
    const mockedDayText = '2 March';
    const fiveBookDay = dayjs(`2020-${mockedIsoMonthDayFromDayCode}`);

    const expectedResult = {
      currentYear: mockedCurrentYear,
      id: data.id,
      dayCode: data.attributes.dayCode,
      question: data.attributes.question,
      answers: [
        { year: '2012', value: data.attributes.answers['2012'] },
        { year: '2020', value: data.attributes.answers['2020'] },
        { year: '2021', value: data.attributes.answers['2021'] },
      ],
      emoji: '⛺️',
      yearOptions: ['2021'],
      day: dayjs(`${mockedCurrentYear}-${mockedIsoMonthDayFromDayCode}`),
      fiveBookDay,
      prevFiveBookDayCode: mockedPrevDayCode,
      nextFiveBookDayCode: mockedNextDayCode,
      fiveBookDayText: mockedDayText,
    };

    (getIsoMonthDayFromDayCode as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => mockedIsoMonthDayFromDayCode)
    );
    (getPrevDayCode as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => mockedPrevDayCode)
    );
    (getNextDayCode as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => mockedNextDayCode)
    );
    (getDayText as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => mockedDayText)
    );

    // Act
    const { result } = renderHook(() =>
      useFiveBookData(data as unknown as FiveBookData)
    );
    const { current } = result;
    // Assert
    expect(current).toEqual(expectedResult);
    expect(getYear).toHaveBeenCalledTimes(1);
    expect(getIsoMonthDayFromDayCode).toHaveBeenCalledWith(
      data.attributes.dayCode
    );
    expect(getPrevDayCode).toHaveBeenCalledWith(fiveBookDay);
    expect(getNextDayCode).toHaveBeenCalledWith(fiveBookDay);
    expect(getDayText).toHaveBeenCalledWith(fiveBookDay);
  });

  describe('when data not provided', () => {
    test('returns default data', () => {
      // Arrange
      const data = null;
      const expectedResult = {
        currentYear: mockedCurrentYear,
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
      // Act
      const { result } = renderHook(() =>
        useFiveBookData(data as unknown as FiveBookData)
      );
      const { current } = result;
      // Assert
      expect(current).toEqual(expectedResult);
      expect(getYear).toHaveBeenCalledTimes(1);
      expect(getIsoMonthDayFromDayCode).not.toHaveBeenCalled();
      expect(getPrevDayCode).not.toHaveBeenCalled();
      expect(getNextDayCode).not.toHaveBeenCalled();
      expect(getDayText).not.toHaveBeenCalled();
    });
  });
});
