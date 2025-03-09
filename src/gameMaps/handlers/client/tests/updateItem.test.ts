import { mockedGame, mockedItem } from '@/gameMaps/types/mocks';
import { CommonError } from '@/common/types/errors';
import updateItem from '../updateItem';

describe('updateItem', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('updates item', async () => {
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
    const result = await updateItem(mockedGame.id, mockedItem.id, {
      description: mockedItem.attributes.description,
    });

    // Assert
    expect(result).toEqual(expectedResult);
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/gameMaps/games/${mockedGame.id}/items/${mockedItem.id}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            id: mockedItem.id,
            attributes: {
              description: mockedItem.attributes.description,
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
        await updateItem(mockedGame.id, mockedItem.id, mockedItem.attributes);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }

      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
