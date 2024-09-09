import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers';

import DatePicker from '../DatePicker';

describe('DatePicker Snapshot', () => {
  const dayValue = dayjs('2022-03-11');
  const onChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', async () => {
    // Arrange
    const { baseElement, getByLabelText } = renderWithTheme(
      <DatePicker dayValue={dayValue} onChange={onChange} />
    );
    // Act
    await userEvent.click(getByLabelText('Date Picker'));
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when static', () => {
    test('renders successfully', () => {
      // Arrange
      // Act
      const { baseElement } = renderWithTheme(
        <DatePicker staticPicker dayValue={dayValue} onChange={onChange} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
