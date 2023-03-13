import PageWrapper from '../PageWrapper';
import renderWithTheme from '@/tests/helpers';

describe('PageWrapper', () => {
  test('renders successfully', () => {
    // Arrange
    // Act
    const { container } = renderWithTheme(<PageWrapper>Children</PageWrapper>);
    // Assert
    expect(container).toMatchSnapshot();
  });
});
