import renderWithTheme from '@/common/tests/helpers';

import PlanesContainer from '@/spotting/components/PlanesContainer';

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
