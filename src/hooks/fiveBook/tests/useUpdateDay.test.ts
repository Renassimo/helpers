import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock';
import useUpdateDay from '@/hooks/fiveBook/useUpdateDay';

describe('useUpdateDay', () => {
  test('updates day', async () => {
    // Arrange
    const responseData = { hello: 'world' };
    const expectedResult = responseData;
    const dayCode = '203';
    const payload = {
      data: {
        id: 'id',
        attributes: { answers: { '2015': 'changed 2015 answer' } },
      },
    };
    fetchMock.patch(`/api/5book/${dayCode}`, responseData);

    const {
      result: { current },
    } = renderHook(() => useUpdateDay());
    const { update } = current;
    // Act
    const result = await update(dayCode, payload);
    // Assert
    expect(result).toEqual(expectedResult);
    expect(fetchMock.lastUrl()).toEqual(`/api/5book/${dayCode}`);
    expect(fetchMock.lastOptions()).toEqual({
      body: '{"data":{"id":"id","attributes":{"answers":{"2015":"changed 2015 answer"}}}}',
      method: 'PATCH',
    });
  });
});
