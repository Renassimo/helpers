import { render } from '@testing-library/react';
import FiveBookCard from '../FiveBookCard';

describe('FiveBookCard', () => {
  test('renders successfully', () => {
    // Arrange
    // Act
    const { container } = render(<FiveBookCard>Children</FiveBookCard>);
    // Assert
    expect(container).toMatchSnapshot();
  });
});
