import renderWithTheme from '@/tests/helpers';

import {
  mockedSpottedPlaneProviderDataEmpty,
  mockedSpottedPlaneProviderDataTruthy,
} from '@/types/spotting/mocks/mockedSpottedPlaneProviderData';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';

import SpottedPlaneCard from '@/components/spotting/SpottedPlaneCard';
import SelectableCard from '@/components/spotting/SelectableCard';
import NewFirstFlightForm from '@/components/spotting/NewFirstFlightForm';
import SpottedPlaneForm from '@/components/spotting/SpottedPlaneForm';

import MockedSelectableCard from '@/components/spotting/SelectableCard/mocks';
import MockedNewFirstFlightForm from '@/components/spotting/NewFirstFlightForm/mocks';
import MockedSpottedPlaneForm from '@/components/spotting/SpottedPlaneForm/mocks';

jest.mock('@/components/spotting/SelectableCard');
jest.mock('@/components/spotting/NewFirstFlightForm');
jest.mock('@/components/spotting/SpottedPlaneForm');
jest.mock('@/hooks/spotting/useSpottedPlanes');

describe('SpottedPlaneCard snapshots', () => {
  beforeEach(() => {
    (SelectableCard as unknown as jest.Mock).mockImplementation(
      MockedSelectableCard
    );
    (NewFirstFlightForm as unknown as jest.Mock).mockImplementation(
      MockedNewFirstFlightForm
    );
    (SpottedPlaneForm as unknown as jest.Mock).mockImplementation(
      MockedSpottedPlaneForm
    );
    (useSpottedPlanes as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({
        selectedIds: [],
      }))
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arrange
    // Act
    const { container } = renderWithTheme(
      <SpottedPlaneCard data={mockedSpottedPlaneProviderDataTruthy} />
    );
    // Assert
    expect(container).toMatchSnapshot();
    expect(MockedNewFirstFlightForm).not.toHaveBeenCalled();
    expect(MockedSpottedPlaneForm).toHaveBeenCalledWith(
      {
        data: mockedSpottedPlaneProviderDataTruthy,
      },
      {}
    );
  });

  describe('when does not show description', () => {
    test('renders successfully', () => {
      // Arrange
      // Act
      const { container } = renderWithTheme(
        <SpottedPlaneCard data={mockedSpottedPlaneProviderDataEmpty} />
      );
      // Assert
      expect(container).toMatchSnapshot();
      expect(MockedNewFirstFlightForm).toHaveBeenCalledWith(
        {
          id: mockedSpottedPlaneProviderDataEmpty.id,
          disabled: false,
        },
        {}
      );
      expect(MockedSpottedPlaneForm).not.toHaveBeenCalled();
    });
  });

  describe('when photo is selectable', () => {
    test('renders successfully', () => {
      // Arrange
      (useSpottedPlanes as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({
          selectedIds: ['id-1'],
        }))
      );
      // Act
      const { container } = renderWithTheme(
        <SpottedPlaneCard
          selectable
          data={mockedSpottedPlaneProviderDataTruthy}
        />
      );
      // Assert
      expect(container).toMatchSnapshot();
      expect(MockedNewFirstFlightForm).not.toHaveBeenCalled();
      expect(MockedSpottedPlaneForm).toHaveBeenCalledWith(
        {
          data: mockedSpottedPlaneProviderDataTruthy,
        },
        {}
      );
    });
  });
});
