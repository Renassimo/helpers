import { mockedGame, mockedPlay } from '@/gameMaps/types/mocks';
import { CommonError } from '@/common/types/errors';
import updatePlay from '../updatePlay';

describe('updatePlay', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('updates play', async () => {
    // Arrange
    const responseData = { data: { hello: 'world' } };
    const mockedFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responseData),
      })
    );
    global.fetch = mockedFetch as jest.Mock;

    // Act
    const result = await updatePlay(mockedGame.id, mockedPlay.id, {
      title: mockedPlay.attributes.title,
    });

    // Assert
    expect(result).toEqual(responseData.data);
    expect(mockedFetch).toHaveBeenCalledWith(
      `/api/gameMaps/games/${mockedGame.id}/plays/${mockedPlay.id}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            id: mockedPlay.id,
            attributes: {
              title: mockedPlay.attributes.title,
            },
          },
        }),
      }
    );
  });

  describe('when response is not ok', () => {
    test('throws error', async () => {
      // Arrange
      const mockedFetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ error: { message: 'Error happened' } }),
        })
      );
      global.fetch = mockedFetch as jest.Mock;

      // Act
      let error = '';
      try {
        await updatePlay(mockedGame.id, mockedPlay.id, mockedPlay.attributes);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }

      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
