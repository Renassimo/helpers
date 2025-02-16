import { CommonError } from '@/common/types/errors';
import deleteItem from '../deleteItem';

describe('deleteItem', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockedGameId = 'game-id';
  const mockedItemId = 'item-id';

  test('deletes play', async () => {
    // Arrange
    const responseData = {};
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responseData),
      })
    ) as jest.Mock;

    // Act
    const result = await deleteItem(mockedGameId, mockedItemId);

    // Assert
    expect(result).toEqual({});
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/gameMaps/games/${mockedGameId}/items/${mockedItemId}`,
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
        await deleteItem(mockedGameId, mockedItemId);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }

      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
