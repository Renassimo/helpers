import { act, renderHook, cleanup } from '@testing-library/react';

import useAlerts from '@/common/hooks/alerts';

import updateItem from '@/gameMaps/handlers/client/updateItem';

import { PlayContextData } from '@/gameMaps/types';

import { mockedGame, mockedItem2, mockedPlay } from '@/gameMaps/types/mocks';

import useUpdateItemCollection from '../hooks/subhooks/useUpdateItemCollection';

jest.mock('@/common/hooks/alerts');
jest.mock('@/gameMaps/handlers/client/updateItem');

describe('useUpdateItemCollection', () => {
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

  const mockedUpdatedData = 'updated data';
  const mockedUpdateItem = jest.fn(() => mockedUpdatedData);

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
    loading: false,
    updateItemCollection: expect.any(Function),
  } as unknown as PlayContextData;

  //
  test('returns state', () => {
    // Arange
    const expectedState = expecteDefaultState;
    // Act
    const { result } = renderHook(() =>
      useUpdateItemCollection(mockedGame, mockedPlay, mockedUpdateSubmittedItem)
    );
    // Assert
    expect(result.current).toEqual(expectedState);
    expect(mockedUseAlerts).toHaveBeenCalledWith();
  });

  describe('when calls updateItemCollection', () => {
    test('returns updated state and calls mockedUpdateItem', async () => {
      // Arange
      const expectedState = expecteDefaultState;
      const { result } = renderHook(() =>
        useUpdateItemCollection(
          mockedGame,
          mockedPlay,
          mockedUpdateSubmittedItem
        )
      );
      // Act
      await act(async () => {
        await result.current.updateItemCollection(mockedItem2.id, true);
      });
      // Assert
      expect(mockedClearAll).toHaveBeenCalledWith();
      expect(mockedClearAll).toHaveBeenCalledTimes(2);
      expect(mockedCreateInfoAlert).toHaveBeenCalledWith(
        'Updating item collection...'
      );
      expect(mockedCreateErrorAlert).not.toHaveBeenCalled();
      expect(mockedCreateSuccessAlert).toHaveBeenCalledWith(
        `Item collection updated`
      );
      expect(mockedUpdateItem).toHaveBeenCalledWith(
        mockedGame.id,
        mockedItem2.id,
        { collected: true, playId: mockedPlay.id }
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
          useUpdateItemCollection(
            mockedGame,
            mockedPlay,
            mockedUpdateSubmittedItem
          )
        );
        // Act
        await act(async () => {
          await result.current.updateItemCollection(mockedItem2.id, true);
        });
        // Assert
        expect(mockedClearAll).toHaveBeenCalledWith();
        expect(mockedClearAll).toHaveBeenCalledTimes(2);
        expect(mockedCreateInfoAlert).toHaveBeenCalledWith(
          'Updating item collection...'
        );
        expect(mockedCreateErrorAlert).toHaveBeenCalledWith(mockedErrorMessage);
        expect(mockedCreateSuccessAlert).not.toHaveBeenCalled();
        expect(mockedUpdateSubmittedItem).not.toHaveBeenCalled();
        expect(result.current).toEqual(expecteDefaultState);
      });
    });
  });
});
