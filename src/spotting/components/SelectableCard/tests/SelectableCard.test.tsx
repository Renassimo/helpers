import renderWithTheme from '@/tests/helpers';
import userEvent from '@testing-library/user-event';

import SelectableCard from '@/spotting/components/SelectableCard';

describe('SelectableCard snapshot', () => {
  const mockedToggleSelect = jest.fn();

  describe('when selectable', () => {
    describe('when button clicked', () => {
      test('toggles select', async () => {
        // Arrange
        const { getByRole } = renderWithTheme(
          <SelectableCard selectable toggleSelect={mockedToggleSelect}>
            SelectableCard
          </SelectableCard>
        );
        // Act
        await userEvent.click(getByRole('button'));
        // Assert
        expect(mockedToggleSelect).toHaveBeenCalled();
      });
    });
  });
});
