import renderWithTheme from '@/tests/helpers';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';

import SpottedPlanesList from '@/spotting/components/SpottedPlanesList';
import SpottedPlaneCard from '@/spotting/components/SpottedPlaneCard';
import GroupPlanesModal from '@/spotting/components/GroupPlanesModal';

import MockedSpottedPlaneCard from '@/spotting/components/SpottedPlaneCard/mocks';
import MockedGroupPlanesModal from '@/spotting/components/GroupPlanesModal/mocks';
import { mockedSpottedPlaneProviderDataTruthy } from '@/types/spotting/mocks/mockedSpottedPlaneProviderData';

jest.mock('@/hooks/spotting/useSpottedPlanes');
jest.mock('@/spotting/components/SpottedPlaneCard');
jest.mock('@/spotting/components/GroupPlanesModal');

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
