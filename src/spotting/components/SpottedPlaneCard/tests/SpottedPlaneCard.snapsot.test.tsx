import renderWithTheme from '@/tests/helpers';

import {
  mockedSpottedPlaneProviderDataEmpty,
  mockedSpottedPlaneProviderDataTruthy,
} from '@/types/spotting/mocks/mockedSpottedPlaneProviderData';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';
import useApplySpottedPlanes from '@/hooks/spotting/useApplySpottedPlanes';

import SpottedPlaneCard from '@/spotting/components/SpottedPlaneCard';
import SelectableCard from '@/spotting/components/SelectableCard';
import NewFirstFlightForm from '@/spotting/components/NewFirstFlightForm';
import SpottedPlaneForm from '@/spotting/components/SpottedPlaneForm';

import MockedSelectableCard from '@/spotting/components/SelectableCard/mocks';
import MockedNewFirstFlightForm from '@/spotting/components/NewFirstFlightForm/mocks';
import MockedSpottedPlaneForm from '@/spotting/components/SpottedPlaneForm/mocks';

jest.mock('@/spotting/components/SelectableCard');
jest.mock('@/spotting/components/NewFirstFlightForm');
jest.mock('@/spotting/components/SpottedPlaneForm');
jest.mock('@/hooks/spotting/useSpottedPlanes');
jest.mock('@/hooks/spotting/useApplySpottedPlanes');

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
    (useApplySpottedPlanes as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({
        update: jest.fn(),
        loading: false,
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

  describe('when loading', () => {
    test('renders successfully', () => {
      // Arrange
      (useApplySpottedPlanes as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({
          update: jest.fn(),
          loading: true,
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
