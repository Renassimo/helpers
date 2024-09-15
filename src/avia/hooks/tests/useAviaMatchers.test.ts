import { act, renderHook } from '@testing-library/react';

import { Matchers } from '@/common/types/matchers';

import useRetreiveData from '@/common/hooks/useRetreiveData';

import useAviaMatchers from '../useAviaMatchers';

jest.mock('@/common/hooks/useRetreiveData');

describe('useAviaMatchers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const data = {
    data: {
      airlines: { airline1: 'Airline 1', airline2: 'Airline 2' },
      airports: {},
    },
  };
  const retreive = jest.fn();

  test('returns state', () => {
    // Arange
    (useRetreiveData as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ data, retreive }))
    );
    const expectedResult = {
      data: data.data,
      updateMatchers: expect.any(Function),
    };
    // Act
    const { result } = renderHook(() => useAviaMatchers());
    // Assert
    expect(result.current).toEqual(expectedResult);
  });

  describe('when calls updateMatchers', () => {
    test('calls retreive and returns updated state', async () => {
      // Arange
      (useRetreiveData as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({ data, retreive }))
      );
      const { result } = renderHook(() => useAviaMatchers());
      const uploadData = {
        airlines: { airline1: 'Airline 1', airline2: 'Airline-2' },
        models: {},
        airports: {},
      } as Matchers;
      const expectedUploadData = {
        airlines: { airline2: 'Airline-2' },
      };
      // Act
      await act(async () => {
        await result.current.updateMatchers(uploadData);
      });
      // Assert
      expect(retreive).toBeCalledWith('/api/avia/matchers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: expectedUploadData }),
      });
    });
  });
});
