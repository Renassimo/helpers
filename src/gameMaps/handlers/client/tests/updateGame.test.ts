import { mockedGame } from '@/gameMaps/types/mocks';
import { CommonError } from '@/common/types/errors';
import updateGame from '../updateGame';

describe('updatesGame', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockedId = 'id';

  test('updates game', async () => {
    // Arrange
    const responseData = { data: { hello: 'world' } };
    const expectedResult = responseData.data;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responseData),
      })
    ) as jest.Mock;

    // Act
    const result = await updateGame(mockedId, mockedGame.attributes);

    // Assert
    expect(result).toEqual(expectedResult);
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/gameMaps/games/${mockedId}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            id: mockedId,
            attributes: mockedGame.attributes,
          },
        }),
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
        await updateGame(mockedId, mockedGame.attributes);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }

      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
