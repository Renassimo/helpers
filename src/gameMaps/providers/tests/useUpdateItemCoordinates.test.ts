import { act, renderHook, cleanup } from '@testing-library/react';

import useAlerts from '@/common/hooks/alerts';

import updateItem from '@/gameMaps/handlers/client/updateItem';

import { PlayContextData } from '@/gameMaps/types';

import { mockedGame, mockedItem1, mockedItem2 } from '@/gameMaps/types/mocks';

import useUpdateItemCoordinates from '../hooks/subhooks/useUpdateItemCoordinates';

jest.mock('@/common/hooks/alerts');
jest.mock('@/gameMaps/handlers/client/updateItem');

describe('useUpdateItemCoordinates', () => {
  const mockedCreateSuccessAlert = jest.fn();
  const mockedCreateErrorAlert = jest.fn();
  const mockedCreateInfoAlert = jest.fn();
  const mockedClearAll = jest.fn();
  const mockedUseAlerts = jest.fn(() => ({
    createSuccessAlert: mockedCreateSuccessAlert,
    createErrorAlert: mockedCreateErrorAlert,
    createInfoAlert: mockedCreateInfoAlert,
    clearAll: mockedClearAll,
  }));

  const mockedItemsState = {
    [mockedItem1.id]: mockedItem1,
    [mockedItem2.id]: mockedItem2,
  };

  const mockedUpdatedData = 'updated data';
  const mockedUpdateItem = jest.fn(() => mockedUpdatedData);

  const mockedSetPointingCategoryId = jest.fn();
  const mockedUpdateSubmittedItem = jest.fn();

  beforeEach(() => {
    (useAlerts as unknown as jest.Mock).mockImplementation(mockedUseAlerts);
    (updateItem as unknown as jest.Mock).mockImplementation(mockedUpdateItem);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const expecteDefaultState = {
    relocateItem: expect.any(Function),
    relocatingItem: null,
    updateItemCoordinates: expect.any(Function),
  } as unknown as PlayContextData;

  //
  test('returns state', () => {
    // Arange
    const expectedState = expecteDefaultState;
    // Act
    const { result } = renderHook(() =>
      useUpdateItemCoordinates(
        mockedGame,
        mockedItemsState,
        mockedSetPointingCategoryId,
        mockedUpdateSubmittedItem
      )
    );
    // Assert
    expect(result.current).toEqual(expectedState);
    expect(mockedUseAlerts).toHaveBeenCalledWith();
  });

  describe('when relocate item called', () => {
    test('returns updated state', async () => {
      // Arange
      const expectedState = {
        ...expecteDefaultState,
        relocatingItem: mockedItem2,
      };
      const { result } = renderHook(() =>
        useUpdateItemCoordinates(
          mockedGame,
          mockedItemsState,
          mockedSetPointingCategoryId,
          mockedUpdateSubmittedItem
        )
      );
      // Act
      await act(async () => {
        await result.current.relocateItem(mockedItem2.id);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
      expect(mockedSetPointingCategoryId).toHaveBeenCalledWith(null);
    });

    describe('when passes null', () => {
      test('returns updated state', async () => {
        // Arange
        const expectedState = expecteDefaultState;
        const { result } = renderHook(() =>
          useUpdateItemCoordinates(
            mockedGame,
            mockedItemsState,
            mockedSetPointingCategoryId,
            mockedUpdateSubmittedItem
          )
        );
        await act(async () => {
          await result.current.relocateItem(mockedItem2.id);
        });
        expect(result.current).toEqual({
          ...expecteDefaultState,
          relocatingItem: mockedItem2,
        });
        // Act
        await act(async () => {
          await result.current.relocateItem(null);
        });
        // Assert
        expect(result.current).toEqual(expectedState);
        expect(mockedSetPointingCategoryId).toBeCalledTimes(1);
      });
    });
  });

  describe('when calls updateItemCoordinates', () => {
    test('returns updated state and calls mockedUpdateItem', async () => {
      // Arange
      const expectedState = expecteDefaultState;
      const { result } = renderHook(() =>
        useUpdateItemCoordinates(
          mockedGame,
          mockedItemsState,
          mockedSetPointingCategoryId,
          mockedUpdateSubmittedItem
        )
      );
      await act(async () => {
        await result.current.relocateItem(mockedItem2.id);
      });
      expect(result.current).toEqual({
        ...expecteDefaultState,
        relocatingItem: mockedItem2,
      });
      // Act
      await act(async () => {
        await result.current.updateItemCoordinates([1, 2]);
      });
      // Assert
      expect(mockedClearAll).toHaveBeenCalledWith();
      expect(mockedClearAll).toHaveBeenCalledTimes(2);
      expect(mockedCreateInfoAlert).toHaveBeenCalledWith(
        'Updating item coordinates...'
      );
      expect(mockedCreateErrorAlert).not.toHaveBeenCalled();
      expect(mockedCreateSuccessAlert).toHaveBeenCalledWith(
        `Item coordinates updated`
      );
      expect(mockedUpdateItem).toHaveBeenCalledWith(
        mockedGame.id,
        mockedItem2.id,
        { coordinates: [1, 2] }
      );
      expect(mockedUpdateSubmittedItem).toHaveBeenCalledWith(mockedUpdatedData);
      expect(result.current).toEqual(expectedState);
    });

    describe('and error happens', () => {
      test('returns updated state and calls mockedUpdateItem', async () => {
        // Arange
        const mockedErrorMessage = 'error-msg';
        (updateItem as unknown as jest.Mock).mockImplementation(
          jest.fn(() => {
            throw new Error(mockedErrorMessage);
          })
        );
        const { result } = renderHook(() =>
          useUpdateItemCoordinates(
            mockedGame,
            mockedItemsState,
            mockedSetPointingCategoryId,
            mockedUpdateSubmittedItem
          )
        );
        await act(async () => {
          await result.current.relocateItem(mockedItem2.id);
        });
        expect(result.current).toEqual({
          ...expecteDefaultState,
          relocatingItem: mockedItem2,
        });
        // Act
        await act(async () => {
          await result.current.updateItemCoordinates([1, 2]);
        });
        // Assert
        expect(mockedClearAll).toHaveBeenCalledWith();
        expect(mockedClearAll).toHaveBeenCalledTimes(2);
        expect(mockedCreateInfoAlert).toHaveBeenCalledWith(
          'Updating item coordinates...'
        );
        expect(mockedCreateErrorAlert).toHaveBeenCalledWith(mockedErrorMessage);
        expect(mockedCreateSuccessAlert).not.toHaveBeenCalled();
        expect(mockedUpdateSubmittedItem).not.toHaveBeenCalled();
        expect(result.current).toEqual({
          ...expecteDefaultState,
          relocatingItem: mockedItem2,
        });
      });
    });
  });
});
