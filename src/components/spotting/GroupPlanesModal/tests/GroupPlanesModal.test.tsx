import renderWithTheme from '@/tests/helpers';
import userEvent from '@testing-library/user-event';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';
import useApplySpottedPlanes from '@/hooks/spotting/useApplySpottedPlanes';
import useAlerts from '@/hooks/alerts';

import GroupPlanesModal from '@/components/spotting/GroupPlanesModal';
import GroupPlanesForm from '@/components/spotting/GroupPlanesForm';

import MockedGroupPlanesForm from '@/components/spotting/GroupPlanesForm/mocks';

import {
  mockedSpottedPlaneProviderDataFalsy,
  mockedSpottedPlaneProviderDataMixed,
  mockedSpottedPlaneProviderDataTruthy,
} from '@/types/spotting/mocks/mockedSpottedPlaneProviderData';

jest.mock('@/hooks/spotting/useSpottedPlanes');
jest.mock('@/hooks/spotting/useApplySpottedPlanes');
jest.mock('@/hooks/alerts');
jest.mock('@/components/spotting/GroupPlanesForm');

describe('GroupPlanesModal', () => {
  const mockedSetIsModalOpen = jest.fn();
  const mockedSpottedPlanes = [
    mockedSpottedPlaneProviderDataTruthy,
    mockedSpottedPlaneProviderDataMixed,
    mockedSpottedPlaneProviderDataFalsy,
  ];
  const mockedSelectedIds = [
    mockedSpottedPlaneProviderDataTruthy.id,
    mockedSpottedPlaneProviderDataFalsy.id,
  ];
  const mockedGroupName = 'Group Name';
  const mockedGroupDescription = 'Group description';
  const mockedGroupHashtags = '#groupHashtags';

  const mockedUpdate = jest.fn();

  const mockedClearGroupData = jest.fn();
  const mockedClearSelectedIds = jest.fn();

  const mockedCreateInfoAlert = jest.fn();
  const mockedClearAll = jest.fn();

  const mockedUseSpottedPlanes = {
    spottedPlanes: mockedSpottedPlanes,
    selectedIds: mockedSelectedIds,
    generateGroupDescriptionAndHashtags: jest.fn(),
    clearGroupData: mockedClearGroupData,
    clearSelectedIds: mockedClearSelectedIds,
    groupName: mockedGroupName,
    groupDescription: mockedGroupDescription,
    groupHashtags: mockedGroupHashtags,
  };

  beforeEach(() => {
    (useSpottedPlanes as unknown as jest.Mock).mockImplementation(
      () => mockedUseSpottedPlanes
    );
    (useApplySpottedPlanes as unknown as jest.Mock).mockImplementation(() => ({
      loading: false,
      update: mockedUpdate,
    }));
    (useAlerts as unknown as jest.Mock).mockImplementation(() => ({
      createInfoAlert: mockedCreateInfoAlert,
      clearAll: mockedClearAll,
    }));
    (GroupPlanesForm as unknown as jest.Mock).mockImplementation(
      MockedGroupPlanesForm
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when closes modal', () => {
    test('clears group data', async () => {
      // Arrange
      const { getByLabelText } = renderWithTheme(
        <GroupPlanesModal isModalOpen setIsModalOpen={mockedSetIsModalOpen} />
      );
      // Act
      await userEvent.click(getByLabelText('close'));
      // Assert
      expect(mockedSetIsModalOpen).toHaveBeenCalledWith(false);
      expect(mockedClearGroupData).toHaveBeenCalledWith();
    });
  });

  describe('when submits modal', () => {
    test('updates data', async () => {
      // Arrange
      const expectedSubmitData = [
        mockedSpottedPlaneProviderDataTruthy,
        mockedSpottedPlaneProviderDataFalsy,
      ].map((item) => ({
        ...item,
        groupName: mockedGroupName,
        groupDescription: mockedGroupDescription,
        groupHashtags: mockedGroupHashtags,
      }));
      const { getByText } = renderWithTheme(
        <GroupPlanesModal isModalOpen setIsModalOpen={mockedSetIsModalOpen} />
      );
      // Act
      await userEvent.click(getByText('Save'));
      // Assert
      expect(mockedUpdate).toHaveBeenCalledWith(expectedSubmitData);
      expect(mockedClearSelectedIds).toHaveBeenCalledWith();
      expect(mockedSetIsModalOpen).toHaveBeenCalledWith(false);
      expect(mockedClearGroupData).toHaveBeenCalledWith();
    });
  });

  describe('when only one plane selected', () => {
    test('does not show info alert', () => {
      // Arrange
      const mockedSelectedIds = [mockedSpottedPlaneProviderDataTruthy.id];
      (useSpottedPlanes as unknown as jest.Mock).mockImplementation(() => ({
        ...mockedUseSpottedPlanes,
        selectedIds: mockedSelectedIds,
      }));
      // Act
      renderWithTheme(
        <GroupPlanesModal isModalOpen setIsModalOpen={mockedSetIsModalOpen} />
      );
      // Assert
      expect(mockedClearAll).toHaveBeenCalledWith();
      expect(mockedCreateInfoAlert).not.toHaveBeenCalled();
    });
  });

  describe('when two planes selected', () => {
    test('shows info alert', () => {
      // Arrange
      // Act
      renderWithTheme(
        <GroupPlanesModal isModalOpen setIsModalOpen={mockedSetIsModalOpen} />
      );
      // Assert
      expect(mockedClearAll).toHaveBeenCalledWith();
      expect(mockedCreateInfoAlert).toHaveBeenCalled();
    });
  });
});
