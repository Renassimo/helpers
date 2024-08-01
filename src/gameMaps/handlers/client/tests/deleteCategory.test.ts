import fetchMock from 'fetch-mock';

import { CommonError } from '@/common/types/errors';

import deleteCategory from '../deleteCategory';

describe('deleteCategory', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  const mockedGameId = 'game-id';
  const mockedCategoryId = 'play-id';

  test('deletes category', async () => {
    // Arange
    const responseData = {};
    fetchMock.delete(
      `/api/gameMaps/games/${mockedGameId}/categories/${mockedCategoryId}`,
      responseData
    );
    // Act
    const result = await deleteCategory(mockedGameId, mockedCategoryId);
    // Assert
    expect(result).toEqual({});
    expect(fetchMock.lastUrl()).toEqual(
      `/api/gameMaps/games/${mockedGameId}/categories/${mockedCategoryId}`
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
        await deleteCategory(mockedGameId, mockedCategoryId);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }
      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
