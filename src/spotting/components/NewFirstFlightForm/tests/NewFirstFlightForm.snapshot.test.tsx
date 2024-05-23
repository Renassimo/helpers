import renderWithTheme from '@/common/tests/helpers';

import NewFirstFlightForm from '@/spotting/components/NewFirstFlightForm';

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
