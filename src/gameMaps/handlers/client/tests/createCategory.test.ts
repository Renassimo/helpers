import { mockedGame, mockedCategory } from '@/gameMaps/types/mocks';
import { CommonError } from '@/common/types/errors';
import createCategory from '../createCategory';

describe('createCategory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('creates category', async () => {
    // Arrange
    const responseData = { data: { hello: 'world' } };
    const expectedResult = responseData.data;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responseData),
      } as Response)
    );

    // Act
    const result = await createCategory(mockedGame.id, {
      title: mockedCategory.attributes.title,
      description: mockedCategory.attributes.description,
      color: mockedCategory.attributes.color,
      itemsAmount: mockedCategory.attributes.itemsAmount,
    });

    // Assert
    expect(result).toEqual(expectedResult);
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/gameMaps/games/${mockedGame.id}/categories`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            attributes: {
              title: mockedCategory.attributes.title,
              description: mockedCategory.attributes.description,
              color: mockedCategory.attributes.color,
              itemsAmount: mockedCategory.attributes.itemsAmount,
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
        } as Response)
      );

      // Act
      let error = '';
      try {
        await createCategory(mockedGame.id, mockedCategory.attributes);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }

      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
