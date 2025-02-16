import { CommonError } from '@/common/types/errors';
import deletePlay from '../deletePlay';

describe('deletePlay', () => {
  const mockedGameId = 'game-id';
  const mockedPlayId = 'play-id';

  afterEach(() => {
    jest.resetAllMocks();
  });

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
    const result = await deletePlay(mockedGameId, mockedPlayId);

    // Assert
    expect(result).toEqual({});
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/gameMaps/games/${mockedGameId}/plays/${mockedPlayId}`,
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
        await deletePlay(mockedGameId, mockedPlayId);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }

      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
