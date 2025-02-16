import { CommonError } from '@/common/types/errors';
import deleteGame from '../deleteGame';

describe('deleteGame', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockedId = 'id';

  test('deletes game', async () => {
    // Arrange
    const responseData = {};
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responseData),
      })
    ) as jest.Mock;

    // Act
    const result = await deleteGame(mockedId);

    // Assert
    expect(result).toEqual({});
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/gameMaps/games/${mockedId}`,
      {
        method: 'DELETE',
      }
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
        await deleteGame(mockedId);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }

      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
