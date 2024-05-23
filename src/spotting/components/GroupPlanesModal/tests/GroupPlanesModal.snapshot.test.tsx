import renderWithTheme from '@/tests/helpers';

import useSpottedPlanes from '@/spotting/hooks/useSpottedPlanes';
import useApplySpottedPlanes from '@/spotting/hooks/useApplySpottedPlanes';

import Modal from '@/common/components/Modal';
import GroupPlanesModal from '@/spotting/components/GroupPlanesModal';
import GroupPlanesForm from '@/spotting/components/GroupPlanesForm';
import SpottedPlaneCard from '@/spotting/components/SpottedPlaneCard';

import MockedModal from '@/common/components/Modal/mocks';
import MockedGroupPlanesForm from '@/spotting/components/GroupPlanesForm/mocks';
import MockedSpottedPlaneCard from '@/spotting/components/SpottedPlaneCard/mocks';

import {
  mockedSpottedPlaneProviderDataFalsy,
  mockedSpottedPlaneProviderDataMixed,
  mockedSpottedPlaneProviderDataTruthy,
} from '@/spotting/types/mocks/mockedSpottedPlaneProviderData';

jest.mock('@/common/components/Modal');
jest.mock('@/spotting/hooks/useSpottedPlanes');
jest.mock('@/spotting/hooks/useApplySpottedPlanes');
jest.mock('@/spotting/components/GroupPlanesForm');
jest.mock('@/spotting/components/SpottedPlaneCard');

describe('GroupPlanesModal snapshot', () => {
  let loading = false;

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

  beforeEach(() => {
    (useSpottedPlanes as unknown as jest.Mock).mockImplementation(() => ({
      spottedPlanes: mockedSpottedPlanes,
      selectedIds: mockedSelectedIds,
      generateGroupDescriptionAndHashtags: jest.fn(),
      groupName: 'groupName',
      clearGroupData: jest.fn(),
      clearSelectedIds: jest.fn(),
    }));
    (useApplySpottedPlanes as unknown as jest.Mock).mockImplementation(() => ({
      loading,
    }));
    (SpottedPlaneCard as unknown as jest.Mock).mockImplementation(
      MockedSpottedPlaneCard
    );
    (Modal as unknown as jest.Mock).mockImplementation(MockedModal);
    (GroupPlanesForm as unknown as jest.Mock).mockImplementation(
      MockedGroupPlanesForm
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arrange
    // Act
    const { baseElement } = renderWithTheme(
      <GroupPlanesModal isModalOpen setIsModalOpen={mockedSetIsModalOpen} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when loading', () => {
    test('renders successfully', () => {
      // Arrange
      loading = true;
      // Act
      const { baseElement } = renderWithTheme(
        <GroupPlanesModal isModalOpen setIsModalOpen={mockedSetIsModalOpen} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when no group name', () => {
    beforeEach(() => {
      (useSpottedPlanes as unknown as jest.Mock).mockImplementation(() => ({
        spottedPlanes: mockedSpottedPlanes,
        selectedIds: mockedSelectedIds,
        generateGroupDescriptionAndHashtags: jest.fn(),
        clearGroupData: jest.fn(),
        clearSelectedIds: jest.fn(),
        groupName: '',
      }));
    });

    test('renders successfully', () => {
      // Arrange
      loading = false;
      // Act
      const { baseElement } = renderWithTheme(
        <GroupPlanesModal isModalOpen setIsModalOpen={mockedSetIsModalOpen} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
