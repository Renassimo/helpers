import { act, renderHook, cleanup } from '@testing-library/react';

import useAlerts from '@/common/hooks/alerts';

import { PlayContextData } from '@/gameMaps/types';

import { mockedItem1, mockedItem2 } from '@/gameMaps/types/mocks';

import useCreateUpdateItem from '../hooks/subhooks/useCreateUpdateItem';

jest.mock('@/common/hooks/alerts');

describe('useCreateUpdateItem', () => {
  const mockedCreateSuccessAlert = jest.fn();
  const mockedClearAll = jest.fn();
  const mockedUseAlerts = jest.fn(() => ({
    createSuccessAlert: mockedCreateSuccessAlert,
    clearAll: mockedClearAll,
  }));

  const mockedUpdateItem = jest.fn();
  const mockedRecountCategories = jest.fn();

  const mockedItemsState = {
    [mockedItem1.id]: mockedItem1,
    [mockedItem2.id]: mockedItem2,
  };

  beforeEach(() => {
    (useAlerts as unknown as jest.Mock).mockImplementation(mockedUseAlerts);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const expecteDefaultState = {
    isItemEditOpen: false,
    creatingItemCoordinates: null,
    pointingCategoryId: null,
    editingItem: null,
    setIsItemEditOpen: expect.any(Function),
    setPointingCategoryId: expect.any(Function),
    openItemCreating: expect.any(Function),
    openItemUpdating: expect.any(Function),
    updateSubmittedItem: expect.any(Function),
    quitFromCreatingNewItem: expect.any(Function),
  } as unknown as PlayContextData;

  test('returns state', () => {
    // Arange
    const expectedState = expecteDefaultState;
    // Act
    const { result } = renderHook(() =>
      useCreateUpdateItem(
        mockedItemsState,
        mockedUpdateItem,
        mockedRecountCategories
      )
    );
    // Assert
    expect(result.current).toEqual(expectedState);
    expect(mockedUseAlerts).toHaveBeenCalledWith();
  });

  describe('when updates poinitngCategoryId', () => {
    test('updates state', async () => {
      // Arange
      const expectedState = {
        ...expecteDefaultState,
        pointingCategoryId: mockedItem2.id,
      } as unknown as PlayContextData;
      const { result } = renderHook(() =>
        useCreateUpdateItem(
          mockedItemsState,
          mockedUpdateItem,
          mockedRecountCategories
        )
      );
      // Act
      await act(async () => {
        await result.current.setPointingCategoryId(mockedItem2.id);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });

  describe('when quits from creating new item', () => {
    test('updates state', async () => {
      // Arange
      const { result } = renderHook(() =>
        useCreateUpdateItem(
          mockedItemsState,
          mockedUpdateItem,
          mockedRecountCategories
        )
      );
      await act(async () => {
        await result.current.setPointingCategoryId(mockedItem2.id);
      });
      expect(result.current.pointingCategoryId).toEqual(mockedItem2.id);
      // Act
      await act(async () => {
        await result.current.quitFromCreatingNewItem();
      });
      // Assert
      expect(result.current).toEqual(expecteDefaultState);
      expect(mockedClearAll).toHaveBeenCalledWith();
    });
  });

  describe('when calls setIsItemEditOpen', () => {
    test('updates state', async () => {
      // Arange
      const expectedState = {
        ...expecteDefaultState,
        isItemEditOpen: true,
      };
      const { result } = renderHook(() =>
        useCreateUpdateItem(
          mockedItemsState,
          mockedUpdateItem,
          mockedRecountCategories
        )
      );
      // Act
      await act(async () => {
        await result.current.setIsItemEditOpen(true);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });

  describe('when calls openItemCreating', () => {
    test('updates state', async () => {
      // Arange
      const mockedCoordinates: [number, number] = [1, 2];
      const expectedState = {
        ...expecteDefaultState,
        isItemEditOpen: true,
        creatingItemCoordinates: mockedCoordinates,
      };
      const { result } = renderHook(() =>
        useCreateUpdateItem(
          mockedItemsState,
          mockedUpdateItem,
          mockedRecountCategories
        )
      );
      // Act
      await act(async () => {
        await result.current.openItemCreating(mockedCoordinates);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });

  describe('when calls openItemUpdating', () => {
    test('updates state', async () => {
      // Arange
      const expectedState = {
        ...expecteDefaultState,
        isItemEditOpen: true,
        editingItem: mockedItem2,
      };
      const { result } = renderHook(() =>
        useCreateUpdateItem(
          mockedItemsState,
          mockedUpdateItem,
          mockedRecountCategories
        )
      );
      // Act
      await act(async () => {
        await result.current.openItemUpdating(mockedItem2.id);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });

  describe('when updates submitted item', () => {
    test('creates success alert and updates state', async () => {
      // Arange
      const mockedUpdatedItem = {
        ...mockedItem2,
        attributes: {
          ...mockedItem2.attributes,
          description: 'updated item',
        },
      };
      const expectedState = {
        ...expecteDefaultState,
        isItemEditOpen: true,
      };
      const { result } = renderHook(() =>
        useCreateUpdateItem(
          mockedItemsState,
          mockedUpdateItem,
          mockedRecountCategories
        )
      );
      await act(async () => {
        await result.current.openItemCreating([1, 2]);
      });
      // Act
      await act(async () => {
        await result.current.updateSubmittedItem(mockedUpdatedItem);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
      expect(mockedUpdateItem).toHaveBeenCalledWith(
        mockedUpdatedItem,
        mockedRecountCategories
      );
      expect(mockedCreateSuccessAlert).toHaveBeenCalledWith(
        `Items were updated!`
      );
    });

    describe('when item is null', () => {
      test('creates success alert and updates state', async () => {
        // Arange
        const expectedState = {
          ...expecteDefaultState,
          isItemEditOpen: true,
        };
        const { result } = renderHook(() =>
          useCreateUpdateItem(
            mockedItemsState,
            mockedUpdateItem,
            mockedRecountCategories
          )
        );
        await act(async () => {
          await result.current.openItemUpdating(mockedItem2.id);
        });
        // Act
        await act(async () => {
          await result.current.updateSubmittedItem(null, mockedItem2.id);
        });
        // Assert
        expect(result.current).toEqual(expectedState);
        expect(mockedUpdateItem).toHaveBeenCalledWith(
          null,
          mockedRecountCategories,
          mockedItem2.id
        );
        expect(mockedCreateSuccessAlert).toHaveBeenCalledWith(
          `Item was deleted!`
        );
      });
    });
  });
});
