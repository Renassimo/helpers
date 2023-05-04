import renderWithTheme from '@/tests/helpers';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';

import SpottedPlanesList from '@/components/spotting/SpottedPlanesList';
import SpottedPlaneCard from '@/components/spotting/SpottedPlaneCard';

import MockedSpottedPlaneCard from '@/components/spotting/SpottedPlaneCard/mocks';

jest.mock('@/hooks/spotting/useSpottedPlanes');
jest.mock('@/components/spotting/SpottedPlaneCard');

describe('SpottedPlanesList', () => {
  const mockedSpottedPlanes = [
    {
      id: 'plane-id',
      name: 'name',
      photoUrl: 'photoUrl',
      planespottersUrl: 'planespottersUrl',
      description: 'description',
      hashtags: '#hashtags',
    },
  ];
  const mockedUseSpottedPlanes = jest.fn(() => ({
    spottedPlanes: mockedSpottedPlanes,
  }));

  beforeEach(() => {
    (useSpottedPlanes as unknown as jest.Mock).mockImplementation(
      mockedUseSpottedPlanes
    );
    (SpottedPlaneCard as unknown as jest.Mock).mockImplementation(
      MockedSpottedPlaneCard
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
        data: mockedSpottedPlanes[0],
        selectable: true,
      },
      {}
    );
  });
});
