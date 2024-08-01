import fetchMock from 'fetch-mock';

import { mockedGame, mockedCategory } from '@/gameMaps/types/mocks';

import { CommonError } from '@/common/types/errors';

import updateCategory from '../updateCategory';

describe('updateCategory', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  test('updates category', async () => {
    // Arange
    const responseData = { data: { hello: 'world' } };
    const expectedResult = responseData.data;
    fetchMock.patch(
      `/api/gameMaps/games/${mockedGame.id}/categories/${mockedCategory.id}`,
      responseData
    );
    // Act
    const result = await updateCategory(mockedGame.id, mockedCategory.id, {
      title: mockedCategory.attributes.title,
    });
    // Assert
    expect(result).toEqual(expectedResult);
    expect(fetchMock.lastUrl()).toEqual(
      `/api/gameMaps/games/${mockedGame.id}/categories/${mockedCategory.id}`
    );
    expect(fetchMock.lastOptions()).toEqual({
      body: `{"data":{"id":"${mockedCategory.id}","attributes":{"title":"${mockedCategory.attributes.title}"}}}`,
      method: 'PATCH',
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
