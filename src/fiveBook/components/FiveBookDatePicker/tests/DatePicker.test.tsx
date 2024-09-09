import dayjs, { Dayjs } from 'dayjs';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers';

import useFiveBook from '@/fiveBook/hooks/useFiveBook';

import DatePicker from '../FiveBookDatePicker';

const mockedPush = jest.fn();

jest.mock('@/fiveBook/hooks/useFiveBook');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockedPush,
  }),
}));

describe('DatePicker', () => {
  const mockedDay = dayjs('2022-03-11');

  let expectedDay = '';
  const mockedOnChange = jest.fn(async (day: Dayjs | null) => {
    expectedDay = day ? day.format('MM/DD') : '';
    return true;
  });

  beforeEach(() => {
    const mockUseFiveBook = {
      day: mockedDay,
    };
    (useFiveBook as jest.Mock).mockImplementation(() => mockUseFiveBook);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('changes date', async () => {
    // Arrange
    const { getByLabelText, getByText } = renderWithTheme(<DatePicker />);
    // Act
    await waitFor(async () => {
      await userEvent.click(getByLabelText('Date Picker'));
      await userEvent.click(getByText('26'));
    });
    // Assert
    expect(mockedPush).toHaveBeenCalledWith('/5book/326');
  });

  describe('custom onChange passed', () => {
    test('changes date', async () => {
      // Arrange
      const { getByLabelText, getByText } = renderWithTheme(
        <DatePicker onChange={mockedOnChange} />
      );
      // Act
      await waitFor(async () => {
        await userEvent.click(getByLabelText('Date Picker'));
        await userEvent.click(getByText('23'));
      });
      // Assert
      expect(expectedDay).toEqual('03/23');
      expect(mockedPush).not.toHaveBeenCalled();
    });
  });

  describe('when static', () => {
    test('changes date', async () => {
      // Arrange
      const { getByText } = renderWithTheme(<DatePicker staticPicker />);
      // Act
      await userEvent.click(getByText('26'));
      // Assert
      expect(mockedPush).toHaveBeenCalledWith('/5book/326');
    });

    describe('custom onChange passed', () => {
      test('changes date', async () => {
        // Arrange
        const { getByText } = renderWithTheme(
          <DatePicker onChange={mockedOnChange} staticPicker />
        );
        // Act
        await userEvent.click(getByText('19'));
        // Assert
        expect(expectedDay).toEqual('03/19');
        expect(mockedPush).not.toHaveBeenCalled();
      });
    });
  });
});
