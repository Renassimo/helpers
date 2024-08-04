import fetchMock from 'fetch-mock';

import { mockedGame, mockedPlay } from '@/gameMaps/types/mocks';

import { CommonError } from '@/common/types/errors';

import createPlay from '../createPlay';

describe('createPlay', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  test('creates play', async () => {
    // Arange
    const responseData = { data: { hello: 'world' } };
    const expectedResult = responseData.data;
    fetchMock.post(`/api/gameMaps/games/${mockedGame.id}/plays`, responseData);
    // Act
    const result = await createPlay(mockedGame.id, {
      title: mockedPlay.attributes.title,
      description: mockedPlay.attributes.description,
    });
    // Assert
    expect(result).toEqual(expectedResult);
    expect(fetchMock.lastUrl()).toEqual(
      `/api/gameMaps/games/${mockedGame.id}/plays`
    );
    expect(fetchMock.lastOptions()).toEqual({
      body: `{"data":{"attributes":{"title":"${mockedPlay.attributes.title}","description":"${mockedPlay.attributes.description}"}}}`,
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
        await createPlay(mockedGame.id, mockedPlay.attributes);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }
      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
