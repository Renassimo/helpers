import fetchMock from 'fetch-mock';

import { CommonError } from '@/common/types/errors';

import deleteGame from '../deleteGame';

describe('deleteGame', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  const mockedId = 'id';

  test('deletes game', async () => {
    // Arange
    const responseData = {};
    fetchMock.delete(`/api/gameMaps/games/${mockedId}`, responseData);
    // Act
    const result = await deleteGame(mockedId);
    // Assert
    expect(result).toEqual({});
    expect(fetchMock.lastUrl()).toEqual(`/api/gameMaps/games/${mockedId}`);
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
        await deleteGame(mockedId);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }
      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
