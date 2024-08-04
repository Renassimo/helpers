import fetchMock from 'fetch-mock';

import { mockedGame } from '@/gameMaps/types/mocks';

import { CommonError } from '@/common/types/errors';

import createGame from '../createGame';

describe('createGame', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  test('creates game', async () => {
    // Arange
    const responseData = { data: { hello: 'world' } };
    const expectedResult = responseData.data;
    fetchMock.post(`/api/gameMaps/games`, responseData);
    // Act
    const result = await createGame(mockedGame.attributes);
    // Assert
    expect(result).toEqual(expectedResult);
    expect(fetchMock.lastUrl()).toEqual('/api/gameMaps/games');
    expect(fetchMock.lastOptions()).toEqual({
      body: `{"data":{"attributes":{"title":"${mockedGame.attributes.title}","backgroundColor":"${mockedGame.attributes.backgroundColor}","description":"${mockedGame.attributes.description}","mapImageUrl":"${mockedGame.attributes.mapImageUrl}"}}}`,
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
        await createGame(mockedGame.attributes);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }
      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
