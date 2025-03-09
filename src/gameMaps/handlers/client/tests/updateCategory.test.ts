import { mockedGame, mockedCategory } from '@/gameMaps/types/mocks';
import { CommonError } from '@/common/types/errors';
import updateCategory from '../updateCategory';

describe('updateCategory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('updates category', async () => {
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
    const result = await updateCategory(mockedGame.id, mockedCategory.id, {
      title: mockedCategory.attributes.title,
    });

    // Assert
    expect(result).toEqual(expectedResult);
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/gameMaps/games/${mockedGame.id}/categories/${mockedCategory.id}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            id: mockedCategory.id,
            attributes: {
              title: mockedCategory.attributes.title,
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
        await updateCategory(
          mockedGame.id,
          mockedCategory.id,
          mockedCategory.attributes
        );
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }

      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
