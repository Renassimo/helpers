import { mockedGame, mockedItem } from '@/gameMaps/types/mocks';
import { CommonError } from '@/common/types/errors';
import createItem from '../createItem';

describe('createPlay', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('creates item', async () => {
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
    const result = await createItem(mockedGame.id, {
      description: mockedItem.attributes.description,
      collected: mockedItem.attributes.collected,
      categoryId: mockedItem.attributes.categoryId,
      playId: mockedItem.attributes.playId,
      coordinates: mockedItem.attributes.coordinates,
    });

    // Assert
    expect(result).toEqual(expectedResult);
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/gameMaps/games/${mockedGame.id}/items`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            attributes: {
              description: mockedItem.attributes.description,
              collected: mockedItem.attributes.collected,
              categoryId: mockedItem.attributes.categoryId,
              playId: mockedItem.attributes.playId,
              coordinates: mockedItem.attributes.coordinates,
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
        await createItem(mockedGame.id, mockedItem.attributes);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }

      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
