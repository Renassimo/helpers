import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  test('renders successfully', () => {
    // Arrange
    // Act
    const { container } = render(<Loader />);
    // Assert
    expect(container).toMatchSnapshot();
  });
});
