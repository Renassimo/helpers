import fetchMock from 'fetch-mock';

import { mockedGame, mockedCategory } from '@/gameMaps/types/mocks';

import { CommonError } from '@/common/types/errors';

import createCategory from '../createCategory';

describe('createCategory', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  test('creates category', async () => {
    // Arange
    const responseData = { data: { hello: 'world' } };
    const expectedResult = responseData.data;
    fetchMock.post(
      `/api/gameMaps/games/${mockedGame.id}/categories`,
      responseData
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
    expect(fetchMock.lastUrl()).toEqual(
      `/api/gameMaps/games/${mockedGame.id}/categories`
    );
    expect(fetchMock.lastOptions()).toEqual({
      body: `{"data":{"attributes":{"title":"${mockedCategory.attributes.title}","description":"${mockedCategory.attributes.description}","color":"${mockedCategory.attributes.color}","itemsAmount":${mockedCategory.attributes.itemsAmount}}}}`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  });

  describe('when response is not ok', () => {
    test('throws error', async () => {
      // Arange
      const mockedFetch = jest.fn(() => ({
        ok: false,
        json: () => ({ error: { message: 'Error happened' } }),
      }));
      Object.defineProperty(globalThis, 'fetch', {
        value: mockedFetch,
      });
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
