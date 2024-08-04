import fetchMock from 'fetch-mock';

import { mockedGame, mockedItem } from '@/gameMaps/types/mocks';

import { CommonError } from '@/common/types/errors';

import updateItem from '../updateItem';

describe('updateItem', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  test('updates item', async () => {
    // Arange
    const responseData = { data: { hello: 'world' } };
    const expectedResult = responseData.data;
    fetchMock.patch(
      `/api/gameMaps/games/${mockedGame.id}/items/${mockedItem.id}`,
      responseData
    );
    // Act
    const result = await updateItem(mockedGame.id, mockedItem.id, {
      description: mockedItem.attributes.description,
    });
    // Assert
    expect(result).toEqual(expectedResult);
    expect(fetchMock.lastUrl()).toEqual(
      `/api/gameMaps/games/${mockedGame.id}/items/${mockedItem.id}`
    );
    expect(fetchMock.lastOptions()).toEqual({
      body: `{"data":{"id":"${mockedItem.id}","attributes":{"description":"${mockedItem.attributes.description}"}}}`,
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
        await updateItem(mockedGame.id, mockedItem.id, mockedItem.attributes);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }
      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
