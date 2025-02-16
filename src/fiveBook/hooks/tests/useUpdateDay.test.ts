import { renderHook } from '@testing-library/react';
import useUpdateDay from '@/fiveBook/hooks/useUpdateDay';

describe('useUpdateDay', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

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

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => responseData,
    });

    const {
      result: { current },
    } = renderHook(() => useUpdateDay());
    const { update } = current;
    // Act
    const result = await update(dayCode, payload);
    // Assert
    expect(result).toEqual(expectedResult);
    expect(global.fetch).toHaveBeenCalledWith(`/api/5book/${dayCode}`, {
      body: '{"data":{"id":"id","attributes":{"answers":{"2015":"changed 2015 answer"}}}}',
      method: 'PATCH',
    });
  });
});
