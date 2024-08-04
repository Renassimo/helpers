import fetchMock from 'fetch-mock';

import { mockedGame, mockedItem } from '@/gameMaps/types/mocks';

import { CommonError } from '@/common/types/errors';

import createItem from '../createItem';

describe('createPlay', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  test('creates item', async () => {
    // Arange
    const responseData = { data: { hello: 'world' } };
    const expectedResult = responseData.data;
    fetchMock.post(`/api/gameMaps/games/${mockedGame.id}/items`, responseData);
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
    expect(fetchMock.lastUrl()).toEqual(
      `/api/gameMaps/games/${mockedGame.id}/items`
    );
    expect(fetchMock.lastOptions()).toEqual({
      body: `{"data":{"attributes":{"description":"${mockedItem.attributes.description}","collected":${mockedItem.attributes.collected},"categoryId":"${mockedItem.attributes.categoryId}","playId":"${mockedItem.attributes.playId}","coordinates":[${mockedItem.attributes.coordinates}]}}}`,
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
        await createItem(mockedGame.id, mockedItem.attributes);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }
      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
