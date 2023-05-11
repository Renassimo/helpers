import renderWithTheme from '@/tests/helpers';

import PlanesContainer from '@/components/spotting/PlanesContainer';

describe('PlanesContainer snapshot', () => {
  test('renders successfully', () => {
    // Arrange
    // Act
    const { container } = renderWithTheme(
      <PlanesContainer>Children</PlanesContainer>
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});
