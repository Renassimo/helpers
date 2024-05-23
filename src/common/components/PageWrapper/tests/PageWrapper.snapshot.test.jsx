import renderWithTheme from '@/tests/helpers';

import PageWrapper from '../PageWrapper';

describe('PageWrapper snapshot', () => {
  test('renders successfully', () => {
    // Arrange
    // Act
    const { container } = renderWithTheme(<PageWrapper>Children</PageWrapper>);
    // Assert
    expect(container).toMatchSnapshot();
  });
});
