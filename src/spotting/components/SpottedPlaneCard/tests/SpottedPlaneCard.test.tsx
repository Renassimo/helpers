import renderWithTheme from '@/common/tests/helpers';
import userEvent from '@testing-library/user-event';

import {
  mockedSpottedPlaneProviderDataEmpty,
  mockedSpottedPlaneProviderDataTruthy,
} from '@/spotting/types/mocks/mockedSpottedPlaneProviderData';

import useApplySpottedPlanes from '@/spotting/hooks/useApplySpottedPlanes';
import useSpottedPlanes from '@/spotting/hooks/useSpottedPlanes';

import SpottedPlaneCard from '@/spotting/components/SpottedPlaneCard';
import SelectableCard from '@/spotting/components/SelectableCard';
import SpottedPlaneForm from '@/spotting/components/SpottedPlaneForm';

import MockedSelectableCard from '@/spotting/components/SelectableCard/mocks';
import MockedSpottedPlaneForm from '@/spotting/components/SpottedPlaneForm/mocks';

jest.mock('@/spotting/components/SelectableCard');
jest.mock('@/spotting/components/SpottedPlaneForm');
jest.mock('@/spotting/hooks/useApplySpottedPlanes');
jest.mock('@/spotting/hooks/useSpottedPlanes');

describe('SpottedPlaneCard', () => {
  const mockedUpdate = jest.fn();
  const mockedGenerateDescription = jest.fn();
  const mockedGenerateHashtags = jest.fn();
  const mockedClearDescription = jest.fn();
  const mockedClearHashtags = jest.fn();
  const mockedAddSelectedId = jest.fn();
  const mockedRemoveSelectedIds = jest.fn();
  const mockedUseSpottedPlanes = {
    selectedIds: [],
    generateDescription: mockedGenerateDescription,
    generateHashtags: mockedGenerateHashtags,
    clearDescription: mockedClearDescription,
    clearHashtags: mockedClearHashtags,
    addSelectedId: mockedAddSelectedId,
    removeSelectedIds: mockedRemoveSelectedIds,
  };

  beforeEach(() => {
    (SelectableCard as unknown as jest.Mock).mockImplementation(
      MockedSelectableCard
    );
    (SpottedPlaneForm as unknown as jest.Mock).mockImplementation(
      MockedSpottedPlaneForm
    );
    (useApplySpottedPlanes as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({
        update: mockedUpdate,
      }))
    );
    (useSpottedPlanes as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedUseSpottedPlanes)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when clicked to "Create description" button', () => {
    test('creates description', async () => {
      // Arrange
      const { getByText } = renderWithTheme(
        <SpottedPlaneCard
          selectable
          data={mockedSpottedPlaneProviderDataEmpty}
        />
      );
      // Act
      await userEvent.click(getByText('Create description'));
      // Assert
      expect(mockedUpdate).not.toHaveBeenCalled();
      expect(mockedGenerateDescription).toHaveBeenCalledWith(
        mockedSpottedPlaneProviderDataEmpty.id
      );
      expect(mockedGenerateHashtags).toHaveBeenCalledWith(
        mockedSpottedPlaneProviderDataEmpty.id
      );
      expect(mockedClearDescription).not.toHaveBeenCalled();
      expect(mockedClearHashtags).not.toHaveBeenCalled();
      expect(mockedAddSelectedId).not.toHaveBeenCalled();
      expect(mockedRemoveSelectedIds).not.toHaveBeenCalled();
    });
  });

  describe('when clicked to "Apply" button', () => {
    test('updates data', async () => {
      // Arrange
      const { getByText } = renderWithTheme(
        <SpottedPlaneCard
          selectable
          data={mockedSpottedPlaneProviderDataTruthy}
        />
      );
      // Act
      await userEvent.click(getByText('Apply'));
      // Assert
      expect(mockedUpdate).toHaveBeenCalledWith([
        mockedSpottedPlaneProviderDataTruthy,
      ]);
      expect(mockedGenerateDescription).not.toHaveBeenCalled();
      expect(mockedGenerateHashtags).not.toHaveBeenCalled();
      expect(mockedClearDescription).not.toHaveBeenCalled();
      expect(mockedClearHashtags).not.toHaveBeenCalled();
      expect(mockedAddSelectedId).not.toHaveBeenCalled();
      expect(mockedRemoveSelectedIds).not.toHaveBeenCalled();
    });
  });

  describe('when clicked to "Discard" button', () => {
    test('clears description and hashtags', async () => {
      // Arrange
      const { getByText } = renderWithTheme(
        <SpottedPlaneCard
          selectable
          data={mockedSpottedPlaneProviderDataTruthy}
        />
      );
      // Act
      await userEvent.click(getByText('Discard'));
      // Assert
      expect(mockedUpdate).not.toHaveBeenCalled();
      expect(mockedGenerateDescription).not.toHaveBeenCalled();
      expect(mockedGenerateHashtags).not.toHaveBeenCalled();
      expect(mockedClearDescription).toHaveBeenCalledWith(
        mockedSpottedPlaneProviderDataTruthy.id
      );
      expect(mockedClearHashtags).toHaveBeenCalledWith(
        mockedSpottedPlaneProviderDataTruthy.id
      );
      expect(mockedAddSelectedId).not.toHaveBeenCalled();
      expect(mockedRemoveSelectedIds).not.toHaveBeenCalled();
    });
  });

  describe('when is selectable', () => {
    describe('when clicked to photo in unselected card', () => {
      test('selects card', async () => {
        // Arrange
        (useSpottedPlanes as unknown as jest.Mock).mockImplementation(
          jest.fn(() => ({
            ...mockedUseSpottedPlanes,
            selectedIds: ['id-empty'],
          }))
        );
        const { getByTitle } = renderWithTheme(
          <SpottedPlaneCard
            selectable
            data={mockedSpottedPlaneProviderDataTruthy}
          />
        );
        // Act
        await userEvent.click(
          getByTitle(mockedSpottedPlaneProviderDataTruthy.name!)
        );
        // Assert
        expect(mockedUpdate).not.toHaveBeenCalled();
        expect(mockedGenerateDescription).not.toHaveBeenCalled();
        expect(mockedGenerateHashtags).not.toHaveBeenCalled();
        expect(mockedClearDescription).not.toHaveBeenCalled();
        expect(mockedClearHashtags).not.toHaveBeenCalled();
        expect(mockedAddSelectedId).toHaveBeenCalledWith(
          mockedSpottedPlaneProviderDataTruthy.id
        );
        expect(mockedRemoveSelectedIds).not.toHaveBeenCalled();
      });
    });

    describe('when clicked to photo in selected card', () => {
      test('unselects card', async () => {
        // Arrange
        (useSpottedPlanes as unknown as jest.Mock).mockImplementation(
          jest.fn(() => ({
            ...mockedUseSpottedPlanes,
            selectedIds: ['id-truthy'],
          }))
        );
        const { getByTitle } = renderWithTheme(
          <SpottedPlaneCard
            selectable
            data={mockedSpottedPlaneProviderDataTruthy}
          />
        );
        // Act
        await userEvent.click(
          getByTitle(mockedSpottedPlaneProviderDataTruthy.name!)
        );
        // Assert
        expect(mockedUpdate).not.toHaveBeenCalled();
        expect(mockedGenerateDescription).not.toHaveBeenCalled();
        expect(mockedGenerateHashtags).not.toHaveBeenCalled();
        expect(mockedClearDescription).not.toHaveBeenCalled();
        expect(mockedClearHashtags).not.toHaveBeenCalled();
        expect(mockedAddSelectedId).not.toHaveBeenCalled();
        expect(mockedRemoveSelectedIds).toHaveBeenCalledWith([
          mockedSpottedPlaneProviderDataTruthy.id,
        ]);
      });
    });
  });

  describe('when is not selectable', () => {
    describe('when clicked to photo', () => {
      test('does not select or unselect card', async () => {
        // Arrange
        const { getByTitle } = renderWithTheme(
          <SpottedPlaneCard data={mockedSpottedPlaneProviderDataTruthy} />
        );
        // Act
        await userEvent.click(
          getByTitle(mockedSpottedPlaneProviderDataTruthy.name!)
        );
        // Assert
        expect(mockedUpdate).not.toHaveBeenCalled();
        expect(mockedGenerateDescription).not.toHaveBeenCalled();
        expect(mockedGenerateHashtags).not.toHaveBeenCalled();
        expect(mockedClearDescription).not.toHaveBeenCalled();
        expect(mockedClearHashtags).not.toHaveBeenCalled();
        expect(mockedAddSelectedId).not.toHaveBeenCalled();
        expect(mockedRemoveSelectedIds).not.toHaveBeenCalled();
      });
    });
  });
});
