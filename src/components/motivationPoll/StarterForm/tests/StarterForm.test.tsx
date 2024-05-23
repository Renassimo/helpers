import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/tests/helpers/renderWithTheme';

import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import StarterForm from '../StarterForm';

jest.mock('@/hooks/motivationPoll/useMotivationPoll');

describe('StarterForm', () => {
  const mockedStartTest = jest.fn();

  beforeEach(() => {
    (useMotivationPoll as jest.Mock).mockImplementation(() => ({
      startTest: mockedStartTest,
    }));
  });

  describe('when Start is clicked', () => {
    test('calls startTest', async () => {
      // Arange
      const { getByText } = renderWithTheme(<StarterForm />);
      // Act
      await userEvent.click(getByText('Start'));
      // Assert
      expect(mockedStartTest).toHaveBeenCalled();
    });
  });
});
