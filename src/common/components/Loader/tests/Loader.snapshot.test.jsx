import renderWithTheme from '@/tests/helpers';

import Loader from '../Loader';

describe('Loader snapshot', () => {
  test('renders successfully', () => {
    // Arrange
    // Act
    const { container } = renderWithTheme(<Loader />);
    // Assert
    expect(container).toMatchSnapshot();
  });
});
