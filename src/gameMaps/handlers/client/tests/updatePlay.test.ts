import fetchMock from 'fetch-mock';

import { mockedGame, mockedPlay } from '@/gameMaps/types/mocks';

import { CommonError } from '@/common/types/errors';

import updatePlay from '../updatePlay';

describe('updatePlay', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  test('updates play', async () => {
    // Arange
    const responseData = { data: { hello: 'world' } };
    const expectedResult = responseData.data;
    fetchMock.patch(
      `/api/gameMaps/games/${mockedGame.id}/plays/${mockedPlay.id}`,
      responseData
    );
    // Act
    const result = await updatePlay(
      mockedGame.id,
      {
        title: mockedPlay.attributes.title,
      },
      mockedPlay.id
    );
    // Assert
    expect(result).toEqual(expectedResult);
    expect(fetchMock.lastUrl()).toEqual(
      `/api/gameMaps/games/${mockedGame.id}/plays/${mockedPlay.id}`
    );
    expect(fetchMock.lastOptions()).toEqual({
      body: `{"data":{"id":"${mockedPlay.id}","attributes":{"title":"${mockedPlay.attributes.title}"}}}`,
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
        await updatePlay(mockedGame.id, mockedPlay.attributes, mockedPlay.id);
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }
      // Assert
      expect(error).toEqual('Error happened');
    });
  });
});
