import { renderHook } from '@testing-library/react';

import fetchMock from 'fetch-mock';

import useUpdateSpottedPlanes from '@/hooks/spotting/useUpdateSpottedPlanes';

describe('useUpdateSpottedPlanes', () => {
  test('updates spotted planes', async () => {
    // Arrange
    const responseData = { hello: 'world' };
    const expectedResult = responseData;
    const payload = {
      data: [
        {
          id: 'id1',
          attributes: {
            description: 'description1',
            hashtags: '#hashtags1',
            newFirstFlight: '2020-03-04',
            groupName: 'groupName',
            groupDescription: 'groupDescription',
            groupHashtags: '#groupHashtags',
          },
        },
        {
          id: 'id2',
          attributes: {
            description: 'description2',
            hashtags: '#hashtags2',
          },
        },
      ],
    };
    fetchMock.patch(`/api/spottedPlanes`, responseData);

    const {
      result: { current },
    } = renderHook(() => useUpdateSpottedPlanes());
    const { update } = current;
    // Act
    const result = await update(payload);
    // Assert
    expect(result).toEqual(expectedResult);
    expect(fetchMock.lastUrl()).toEqual(`/api/spottedPlanes`);
    expect(fetchMock.lastOptions()).toEqual({
      body: '{"data":[{"id":"id1","attributes":{"description":"description1","hashtags":"#hashtags1","newFirstFlight":"2020-03-04","groupName":"groupName","groupDescription":"groupDescription","groupHashtags":"#groupHashtags"}},{"id":"id2","attributes":{"description":"description2","hashtags":"#hashtags2"}}]}',
      method: 'PATCH',
    });
  });
});
