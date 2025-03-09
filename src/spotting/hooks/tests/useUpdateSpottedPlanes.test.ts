import { renderHook } from '@testing-library/react-hooks';
import useUpdateSpottedPlanes from '@/spotting/hooks/useUpdateSpottedPlanes';

describe('useUpdateSpottedPlanes', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

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

    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseData),
    });

    const {
      result: { current },
    } = renderHook(() => useUpdateSpottedPlanes());
    const { update } = current;

    // Act
    const result = await update(payload);

    // Assert
    expect(result).toEqual(expectedResult);
    expect(global.fetch).toHaveBeenCalledWith('/api/spottedPlanes', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  });
});
