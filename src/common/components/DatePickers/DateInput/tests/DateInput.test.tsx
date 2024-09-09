import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import userEvent from '@testing-library/user-event';
import pasteText from '@/common/utils/clipboard/pasteText';

import DateInput, { DateInputProps } from '../DateInput';

jest.mock('@/common/utils/clipboard/pasteText');

describe('DateInput', () => {
  const setValue = jest.fn();
  const label = 'Date Input Test';
  const defaultProps: DateInputProps = {
    setValue,
    fullWidth: true,
    label,
  };

  const today = '2020-02-11';

  beforeAll(() => {
    jest.useFakeTimers({
      doNotFake: ['setTimeout'],
    });
    jest.setSystemTime(new Date(today));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when value passed', () => {
    const value = '2020-10-10';
    const props = {
      ...defaultProps,
      value,
    };

    describe('when clicks prev day', () => {
      test('updates value', async () => {
        // Arange
        const { getByLabelText } = renderWithTheme(<DateInput {...props} />);
        // Act
        await userEvent.click(getByLabelText('Prev day'));
        // Assert
        expect(setValue).toBeCalledWith('2020-10-09');
      });
    });

    describe('when clicks next day', () => {
      test('updates value', async () => {
        // Arange
        const { getByLabelText } = renderWithTheme(<DateInput {...props} />);
        // Act
        await userEvent.click(getByLabelText('Next day'));
        // Assert
        expect(setValue).toBeCalledWith('2020-10-11');
      });
    });

    describe('when clicks clear', () => {
      test('updates value', async () => {
        // Arange
        const { getByLabelText } = renderWithTheme(<DateInput {...props} />);
        // Act
        await userEvent.click(getByLabelText('Clear date'));
        // Assert
        expect(setValue).toBeCalledWith(null);
      });
    });
  });

  describe('when empty value passed', () => {
    const value = null;
    const props = {
      ...defaultProps,
      value,
    };

    describe('when clicks paste', () => {
      const pastedDate = '18 dec 19';

      beforeEach(() => {
        (pasteText as unknown as jest.Mock).mockImplementation(
          jest.fn(() => pastedDate)
        );
      });

      test('updates value', async () => {
        // Arange
        const { getByLabelText } = renderWithTheme(<DateInput {...props} />);
        // Act
        await userEvent.click(getByLabelText('Paste date'));
        // Assert
        expect(setValue).toBeCalledWith('2019-12-18');
      });
    });

    describe('when clicks today', () => {
      test('updates value', async () => {
        // Arange
        const { getByLabelText } = renderWithTheme(<DateInput {...props} />);
        // Act
        await userEvent.click(getByLabelText('Today'));
        // Assert
        expect(setValue).toBeCalledWith(today);
      });
    });

    describe('when selects day on calendar', () => {
      test('updates value', async () => {
        // Arange
        const { getByLabelText, getByText } = renderWithTheme(
          <DateInput {...props} />
        );
        // Act
        await userEvent.click(getByLabelText('Date Picker'));
        await userEvent.click(getByText('26'));
        // Assert
        expect(setValue).toBeCalledWith('2020-02-26');
      });
    });

    describe('when originalValue passed', () => {
      const originalValue = '2022-11-22';
      const props = {
        ...defaultProps,
        value: null,
        originalValue,
      };

      test('updates to original value', async () => {
        // Arange
        const { getByLabelText } = renderWithTheme(<DateInput {...props} />);
        // Act
        await userEvent.click(getByLabelText('Refresh'));
        // Assert
        expect(setValue).toBeCalledWith(originalValue);
      });
    });
  });
});
