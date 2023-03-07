import renderWithTheme from '@/tests/helpers';
import FiveBookCard from '../FiveBookCard';

describe('FiveBookCard', () => {
  test('renders successfully', () => {
    // Arrange
    // Act
    const { container } = renderWithTheme(
      <FiveBookCard>Children</FiveBookCard>
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});
