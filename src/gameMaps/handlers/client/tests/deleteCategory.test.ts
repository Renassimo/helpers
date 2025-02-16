import { CommonError } from '@/common/types/errors';
import deleteCategory from '../deleteCategory';

describe('deleteCategory', () => {
  const mockedGameId = 'game-id';
  const mockedCategoryId = 'play-id';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('deletes category', async () => {
    // Arrange
    const responseData = {};
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responseData),
      })
    ) as jest.Mock;

    // Act
    const result = await deleteCategory(mockedGameId, mockedCategoryId);

    // Assert
    expect(result).toEqual({});
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/gameMaps/games/${mockedGameId}/categories/${mockedCategoryId}`,
      { method: 'DELETE' }
    );
  });

  describe('when response is not ok', () => {
    test('throws error', async () => {
      // Arrange
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ error: { message: 'Error happened' } }),
        })
      ) as jest.Mock;

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
