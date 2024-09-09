import { act, renderHook } from '@testing-library/react';

import useRetreiveData from '@/common/hooks/useRetreiveData';

import useAviaOptions from '../useAviaOptions';

jest.mock('@/common/hooks/useRetreiveData');

describe('useAviaOptions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const data = { data: 'data' };
  const retreive = jest.fn();

  test('returns state', () => {
    // Arange
    (useRetreiveData as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ data, retreive }))
    );
    const expectedResult = {
      data: data.data,
      updateOptions: expect.any(Function),
    };
    // Act
    const { result } = renderHook(() => useAviaOptions());
    // Assert
    expect(result.current).toEqual(expectedResult);
  });

  describe('when calls updateOptions', () => {
    test('calls retreive and returns updated state', async () => {
      // Arange
      (useRetreiveData as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({ data, retreive }))
      );
      const { result } = renderHook(() => useAviaOptions());
      // Act
      await act(async () => {
        await result.current.updateOptions();
      });
      // Assert
      expect(retreive).toBeCalledWith('/api/avia/options');
    });
  });
});
