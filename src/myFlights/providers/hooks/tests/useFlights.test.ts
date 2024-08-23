import { act, renderHook } from '@testing-library/react';

import {
  mockedFlight1,
  mockedFlight2,
  mockedFlight3,
  mockedFlights,
  mockedFlightsList,
} from '@/myFlights/types/mocks';

import useFlights from '../subhooks/useFlights';

describe('useFlights', () => {
  const expectedDefaultState = {
    flights: mockedFlights,
    flightsList: mockedFlightsList,
    updateFlight: expect.any(Function),
  };

  test('return default state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useFlights(mockedFlightsList));
    // Assert
    expect(result.current).toEqual(expectedDefaultState);
  });

  describe('when no data passed', () => {
    test('return default empty state', () => {
      // Arange
      const expectedState = {
        flights: {},
        flightsList: [],
        updateFlight: expect.any(Function),
      };
      // Act
      const { result } = renderHook(() => useFlights(null));
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });

  describe('when flight was updated', () => {
    test('return default state', async () => {
      // Arange
      const updatedFlight = {
        ...mockedFlight1,
        attributes: { ...mockedFlight1.attributes, title: 'updated title1' },
      };
      const expectedState = {
        flights: {
          ...expectedDefaultState.flights,
          [updatedFlight.id]: updatedFlight,
        },
        flightsList: [updatedFlight, mockedFlight2, mockedFlight3],
        updateFlight: expect.any(Function),
      };
      const { result } = renderHook(() => useFlights(mockedFlightsList));
      // Act
      await act(async () => {
        await result.current.updateFlight(updatedFlight);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });
});
