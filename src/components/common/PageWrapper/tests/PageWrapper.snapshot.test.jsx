import { render } from '@testing-library/react';
import PageWrapper from '../PageWrapper';

describe('PageWrapper', () => {
  test('renders successfully', () => {
    // Arrange
    // Act
    const { container } = render(<PageWrapper>Children</PageWrapper>);
    // Assert
    expect(container).toMatchSnapshot();
  });
});
