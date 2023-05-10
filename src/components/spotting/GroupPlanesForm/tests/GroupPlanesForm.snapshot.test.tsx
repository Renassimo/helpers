import renderWithTheme from '@/tests/helpers';

import GroupPlanesForm from '@/components/spotting/GroupPlanesForm';

describe('GroupPlanesForm', () => {
  test('should rendered successfully', () => {
    // Arrange
    // Act
    const { container } = renderWithTheme(<GroupPlanesForm />);
    // Assert
    expect(container).toMatchSnapshot();
  });
});
