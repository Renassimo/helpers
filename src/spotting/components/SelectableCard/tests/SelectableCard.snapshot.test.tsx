import renderWithTheme from '@/tests/helpers';

import SelectableCard from '@/spotting/components/SelectableCard';

describe('SelectableCard snapshot', () => {
  const mockedToggleSelect = jest.fn();

  test('renders successfully', () => {
    // Arrange
    // Act
    const { container } = renderWithTheme(
      <SelectableCard toggleSelect={mockedToggleSelect}>
        SelectableCard
      </SelectableCard>
    );
    // Assert
    expect(container).toMatchSnapshot();
  });

  describe('when selectable', () => {
    describe('and selected', () => {
      describe('and there are other selected', () => {
        test('renders successfully', () => {
          // Arrange
          // Act
          const { container } = renderWithTheme(
            <SelectableCard
              selectable
              selected
              isAnySelected
              toggleSelect={mockedToggleSelect}
            >
              SelectableCard
            </SelectableCard>
          );
          // Assert
          expect(container).toMatchSnapshot();
        });
      });

      describe('and there no are other selected', () => {
        test('renders successfully', () => {
          // Arrange
          // Act
          const { container } = renderWithTheme(
            <SelectableCard
              selectable
              selected
              isAnySelected={false}
              toggleSelect={mockedToggleSelect}
            >
              SelectableCard
            </SelectableCard>
          );
          // Assert
          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('and not selected', () => {
      describe('and there are other selected', () => {
        test('renders successfully', () => {
          // Arrange
          // Act
          const { container } = renderWithTheme(
            <SelectableCard
              selectable
              selected={false}
              isAnySelected
              toggleSelect={mockedToggleSelect}
            >
              SelectableCard
            </SelectableCard>
          );
          // Assert
          expect(container).toMatchSnapshot();
        });
      });

      describe('and there no are other selected', () => {
        test('renders successfully', () => {
          // Arrange
          // Act
          const { container } = renderWithTheme(
            <SelectableCard
              selectable
              selected={false}
              isAnySelected={false}
              toggleSelect={mockedToggleSelect}
            >
              SelectableCard
            </SelectableCard>
          );
          // Assert
          expect(container).toMatchSnapshot();
        });
      });
    });
  });
});
