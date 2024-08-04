import fetchMock from 'fetch-mock';

import { CommonError } from '@/common/types/errors';

import deleteItem from '../deleteItem';

describe('deleteItem', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  const mockedGameId = 'game-id';
  const mockedItemId = 'item-id';

  test('deletes play', async () => {
    // Arange
    const responseData = {};
    fetchMock.delete(
      `/api/gameMaps/games/${mockedGameId}/items/${mockedItemId}`,
      responseData
    );
    // Act
    const result = await deleteItem(mockedGameId, mockedItemId);
    // Assert
    expect(result).toEqual({});
    expect(fetchMock.lastUrl()).toEqual(
      `/api/gameMaps/games/${mockedGameId}/items/${mockedItemId}`
    );
    expect(fetchMock.lastOptions()).toEqual({
      method: 'DELETE',
    });
  });

  describe('when response is not ok', () => {
    test('throws error', async () => {
      // Arange
      const mockedFetch = jest.fn(() => ({
        ok: false,
        json: () => ({ error: { message: 'Error happened' } }),
      }));
      Object.defineProperty(globalThis, 'fetch', {
        value: mockedFetch,
      });
      // Act
      let error = '';
      try {
        await deleteItem(mockedGameId, mockedItemId);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }
      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
