import renderWithTheme from '@/tests/helpers';

import NewFirstFlightForm from '@/components/spotting/NewFirstFlightForm';

describe('NewFirstFlightForm', () => {
  test('renders successfully', async () => {
    // Arrange
    const mockedId = 'id-mocked';
    // Act
    const { container } = renderWithTheme(<NewFirstFlightForm id={mockedId} />);
    // Assert
    expect(container).toMatchSnapshot();
  });

  describe('when disabled', () => {
    test('renders successfully', async () => {
      // Arrange
      const mockedId = 'id-mocked';
      // Act
      const { container } = renderWithTheme(
        <NewFirstFlightForm id={mockedId} disabled />
      );
      // Assert
      expect(container).toMatchSnapshot();
    });
  });
});
