import renderWithTheme from '@/common/tests/helpers';

import SpottedPlaneForm from '@/spotting/components/SpottedPlaneForm';

import { mockedSpottedPlaneProviderDataTruthy } from '@/spotting/types/mocks/mockedSpottedPlaneProviderData';

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
