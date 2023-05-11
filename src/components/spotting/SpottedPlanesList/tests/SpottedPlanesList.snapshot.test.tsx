import renderWithTheme from '@/tests/helpers';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';

import SpottedPlanesList from '@/components/spotting/SpottedPlanesList';
import SpottedPlaneCard from '@/components/spotting/SpottedPlaneCard';
import GroupPlanesModal from '@/components/spotting/GroupPlanesModal';

import MockedSpottedPlaneCard from '@/components/spotting/SpottedPlaneCard/mocks';
import MockedGroupPlanesModal from '@/components/spotting/GroupPlanesModal/mocks';
import { mockedSpottedPlaneProviderDataTruthy } from '@/types/spotting/mocks/mockedSpottedPlaneProviderData';

jest.mock('@/hooks/spotting/useSpottedPlanes');
jest.mock('@/components/spotting/SpottedPlaneCard');
jest.mock('@/components/spotting/GroupPlanesModal');

describe('SpottedPlanesList', () => {
  const mockedUseSpottedPlanes = jest.fn(() => ({
    spottedPlanes: [mockedSpottedPlaneProviderDataTruthy],
  }));

  beforeEach(() => {
    (useSpottedPlanes as unknown as jest.Mock).mockImplementation(
      mockedUseSpottedPlanes
    );
    (SpottedPlaneCard as unknown as jest.Mock).mockImplementation(
      MockedSpottedPlaneCard
    );
    (GroupPlanesModal as unknown as jest.Mock).mockImplementation(
      MockedGroupPlanesModal
    );
  });

  test('renders successfully', () => {
    // Arrange
    // Act
    const { container } = renderWithTheme(<SpottedPlanesList />);
    // Assert
    expect(container).toMatchSnapshot();
    expect(MockedSpottedPlaneCard).toHaveBeenCalledWith(
      {
        data: mockedSpottedPlaneProviderDataTruthy,
        selectable: true,
      },
      {}
    );
  });
});
