import { mockedGame, mockedPlay } from '@/gameMaps/types/mocks';
import { CommonError } from '@/common/types/errors';
import createPlay from '../createPlay';

describe('createPlay', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('creates play', async () => {
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
    const result = await createPlay(mockedGame.id, {
      title: mockedPlay.attributes.title,
      description: mockedPlay.attributes.description,
    });

    // Assert
    expect(result).toEqual(expectedResult);
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/gameMaps/games/${mockedGame.id}/plays`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            attributes: {
              title: mockedPlay.attributes.title,
              description: mockedPlay.attributes.description,
            },
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
        await createPlay(mockedGame.id, mockedPlay.attributes);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }

      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
