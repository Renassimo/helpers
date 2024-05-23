import dayjs from 'dayjs';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/tests/helpers';

import useFiveBook from '@/fiveBook/hooks/useFiveBook';

import DatePicker from '../DatePicker';

const mockedPush = jest.fn();

jest.mock('@/fiveBook/hooks/useFiveBook');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockedPush,
  }),
}));

describe('DatePicker', () => {
  const mockedDay = dayjs('2022-03-11');

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
      await userEvent.click(
        getByLabelText('Choose date, selected date is Mar 11, 2022')
      );
      await userEvent.click(getByText('26'));
    });
    // Assert
    expect(mockedPush).toHaveBeenCalledWith('/5book/326');
  });

  describe('custom onChange passed', () => {
    test('changes date', async () => {
      // Arrange
      const mockedOnChange = jest.fn();
      const { getByLabelText, getByText } = renderWithTheme(
        <DatePicker onChange={mockedOnChange} />
      );
      // Act
      await waitFor(async () => {
        await userEvent.click(
          getByLabelText('Choose date, selected date is Mar 11, 2022')
        );
        await userEvent.click(getByText('26'));
      });
      // Assert
      expect(mockedOnChange).toHaveBeenCalledWith(mockedDay.add(15, 'day'));
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
        const mockedOnChange = jest.fn();
        const { getByText } = renderWithTheme(
          <DatePicker onChange={mockedOnChange} staticPicker />
        );
        // Act
        await userEvent.click(getByText('26'));
        // Assert
        expect(mockedOnChange).toHaveBeenCalledWith(mockedDay.add(15, 'day'));
        expect(mockedPush).not.toHaveBeenCalled();
      });
    });
  });
});
