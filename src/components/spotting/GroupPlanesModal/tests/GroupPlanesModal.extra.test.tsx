import renderWithTheme from '@/tests/helpers';
import userEvent from '@testing-library/user-event';

import AlertsProvider from '@/providers/alerts';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';

import GroupPlanesModal from '@/components/spotting/GroupPlanesModal';
import GroupPlanesForm from '@/components/spotting/GroupPlanesForm';

import MockedGroupPlanesForm from '@/components/spotting/GroupPlanesForm/mocks';

import {
  mockedSpottedPlaneProviderDataFalsy,
  mockedSpottedPlaneProviderDataMixed,
  mockedSpottedPlaneProviderDataTruthy,
} from '@/types/spotting/mocks/mockedSpottedPlaneProviderData';

jest.mock('@/hooks/spotting/useSpottedPlanes');
jest.mock('@/components/spotting/GroupPlanesForm');

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
