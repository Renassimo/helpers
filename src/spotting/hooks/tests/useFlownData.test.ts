import { renderHook } from '@testing-library/react';

import useRetreiveData from '@/common/hooks/useRetreiveData';

import { Avia } from '@/avia/types/avia';

import useFlownData from '../useFlownData';

jest.mock('@/common/hooks/useRetreiveData');

describe('useFlownData', () => {
  const retreive = jest.fn();
  const loading = 'loading';
  const data = 'data';

  beforeEach(() => {
    (useRetreiveData as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ retreive, loading, data }))
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('reutrns state', () => {
    // Arange
    // Act
    const { result } = renderHook(() =>
      useFlownData({ chosenAircraft: null } as Avia.AircraftsResult)
    );
    // Assert
    expect(result.current).toEqual({ loading, data });
    expect(retreive).not.toBeCalled();
  });

  describe('when aircraft passed', () => {
    test('reuturns state and call retreive', () => {
      // Arange
      // Act
      const { result } = renderHook(() =>
        useFlownData({
          chosenAircraft: { attributes: { serial: 'serial' } },
        } as Avia.AircraftsResult)
      );
      // Assert
      expect(result.current).toEqual({ loading, data });
      expect(retreive).toBeCalledWith(`/api/myFlights?cn=serial`);
    });

    describe('and source is "myFlights"', () => {
      test('reuturns state but not call retreive', () => {
        // Arange
        // Act
        const { result } = renderHook(() =>
          useFlownData({
            chosenAircraft: {
              attributes: { serial: 'serial', source: 'myFlights' },
            },
          } as Avia.AircraftsResult)
        );
        // Assert
        expect(result.current).toEqual({ loading, data });
        expect(retreive).not.toBeCalled();
      });
    });
  });
});
