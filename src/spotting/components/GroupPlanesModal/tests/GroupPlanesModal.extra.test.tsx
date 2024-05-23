import renderWithTheme from '@/tests/helpers';
import userEvent from '@testing-library/user-event';

import AlertsProvider from '@/common/providers/alerts';

import useSpottedPlanes from '@/spotting/hooks/useSpottedPlanes';

import GroupPlanesModal from '@/spotting/components/GroupPlanesModal';
import GroupPlanesForm from '@/spotting/components/GroupPlanesForm';

import MockedGroupPlanesForm from '@/spotting/components/GroupPlanesForm/mocks';

import {
  mockedSpottedPlaneProviderDataFalsy,
  mockedSpottedPlaneProviderDataMixed,
  mockedSpottedPlaneProviderDataTruthy,
} from '@/types/spotting/mocks/mockedSpottedPlaneProviderData';

jest.mock('@/spotting/hooks/useSpottedPlanes');
jest.mock('@/spotting/components/GroupPlanesForm');

describe('GroupPlanesModal extra', () => {
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
  const mockedGenerateGroupDescriptionAndHashtags = jest.fn();

  const mockedUseSpottedPlanes = {
    spottedPlanes: mockedSpottedPlanes,
    selectedIds: mockedSelectedIds,
    generateGroupDescriptionAndHashtags:
      mockedGenerateGroupDescriptionAndHashtags,
  };

  beforeEach(() => {
    (useSpottedPlanes as unknown as jest.Mock).mockImplementation(
      () => mockedUseSpottedPlanes
    );
    (GroupPlanesForm as unknown as jest.Mock).mockImplementation(
      MockedGroupPlanesForm
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when opens modal', () => {
    test('generates hashtags and description', async () => {
      // Arrange
      // Act
      const { getByText } = renderWithTheme(
        <AlertsProvider>
          <GroupPlanesModal isModalOpen setIsModalOpen={mockedSetIsModalOpen} />
        </AlertsProvider>
      );
      await userEvent.click(getByText('Create'));
      // Assert
      expect(mockedSetIsModalOpen).toHaveBeenCalledWith(true);
      expect(mockedGenerateGroupDescriptionAndHashtags).toHaveBeenCalledWith();
    });
  });
});
