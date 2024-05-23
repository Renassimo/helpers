import renderWithTheme from '@/tests/helpers';

import SpottedPlaneForm from '@/spotting/components/SpottedPlaneForm';

import { mockedSpottedPlaneProviderDataTruthy } from '@/types/spotting/mocks/mockedSpottedPlaneProviderData';

describe('SpottedPlaneForm snapshot', () => {
  test('renders successfully', () => {
    // Arrange
    // Act
    const { container } = renderWithTheme(
      <SpottedPlaneForm data={mockedSpottedPlaneProviderDataTruthy} />
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});
