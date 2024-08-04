import fetchMock from 'fetch-mock';

import { mockedGame } from '@/gameMaps/types/mocks';

import { CommonError } from '@/common/types/errors';

import updateGame from '../updateGame';

describe('updatesGame', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  const mockedId = 'id';

  test('updates game', async () => {
    // Arange
    const responseData = { data: { hello: 'world' } };
    const expectedResult = responseData.data;
    fetchMock.patch(`/api/gameMaps/games/${mockedId}`, responseData);
    // Act
    const result = await updateGame(mockedId, mockedGame.attributes);
    // Assert
    expect(result).toEqual(expectedResult);
    expect(fetchMock.lastUrl()).toEqual(`/api/gameMaps/games/${mockedId}`);
    expect(fetchMock.lastOptions()).toEqual({
      body: `{"data":{"id":"id","attributes":{"title":"${mockedGame.attributes.title}","backgroundColor":"${mockedGame.attributes.backgroundColor}","description":"${mockedGame.attributes.description}","mapImageUrl":"${mockedGame.attributes.mapImageUrl}"}}}`,
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
        await updateGame(mockedId, mockedGame.attributes);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }
      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
