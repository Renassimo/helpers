import fetchMock from 'fetch-mock';

import { CommonError } from '@/common/types/errors';

import deletePlay from '../deletePlay';

describe('deletePlay', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  const mockedGameId = 'game-id';
  const mockedPlayId = 'play-id';

  test('deletes play', async () => {
    // Arange
    const responseData = {};
    fetchMock.delete(
      `/api/gameMaps/games/${mockedGameId}/plays/${mockedPlayId}`,
      responseData
    );
    // Act
    const result = await deletePlay(mockedGameId, mockedPlayId);
    // Assert
    expect(result).toEqual({});
    expect(fetchMock.lastUrl()).toEqual(
      `/api/gameMaps/games/${mockedGameId}/plays/${mockedPlayId}`
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
        await deletePlay(mockedGameId, mockedPlayId);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }
      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
