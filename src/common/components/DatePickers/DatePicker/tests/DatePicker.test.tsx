import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers';

import dayjs, { Dayjs } from 'dayjs';

import DatePicker from '../DatePicker';

describe('DatePicker', () => {
  const dayValue = dayjs('2022-03-11');
  let expectedCalledWith: string;
  const onChange = jest.fn((day: Dayjs | null) => {
    expectedCalledWith = day ? day.format('YYYY/MM/DD') : '';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('changes date', async () => {
    // Arrange
    const { getByLabelText, getByText } = renderWithTheme(
      <DatePicker dayValue={dayValue} onChange={onChange} />
    );
    // Act
    await waitFor(async () => {
      await userEvent.click(getByLabelText('Date Picker'));
      await userEvent.click(getByText('26'));
    });
    // Assert
    expect(expectedCalledWith).toEqual('2022/03/26');
  });

  describe('when static', () => {
    test('changes date', async () => {
      // Arrange
      const { getByText } = renderWithTheme(
        <DatePicker staticPicker dayValue={dayValue} onChange={onChange} />
      );
      // Act
      await userEvent.click(getByText('24'));
      // Assert
      expect(expectedCalledWith).toEqual('2022/03/24');
    });
  });
});
