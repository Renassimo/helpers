import { render } from '@testing-library/react';
import useFiveBook from '@/hooks/fiveBook/useFiveBook';

import DayLink from '../DayLink';

jest.mock('@/hooks/fiveBook/useFiveBook');

describe('DayLink', () => {
  test('renders successfully', () => {
    // Arrange
    (useFiveBook as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => ({
        prevFiveBookDayCode: '101',
        nextFiveBookDayCode: '103',
      }))
    );
    // Act
    const { container } = render(<DayLink next prev />);
    // Assert
    expect(container).toMatchSnapshot();
  });
});
