import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers';

import useFiveBook from '@/fiveBook/hooks/useFiveBook';

import DatePicker from '../FiveBookDatePicker';

jest.mock('@/fiveBook/hooks/useFiveBook');
jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('DatePicker Snapshot', () => {
  beforeEach(() => {
    const mockUseFiveBook = {
      day: dayjs('2022-03-11'),
    };
    (useFiveBook as jest.Mock).mockImplementation(() => mockUseFiveBook);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', async () => {
    // Arrange
    const { baseElement, getByLabelText } = renderWithTheme(<DatePicker />);
    // Act
    await userEvent.click(getByLabelText('Date Picker'));
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when static', () => {
    test('renders successfully', () => {
      // Arrange
      // Act
      const { baseElement } = renderWithTheme(<DatePicker staticPicker />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
