import { act, renderHook } from '@testing-library/react';

import {
  mockedMyFlight1,
  mockedMyFlight2,
  mockedMyFlight3,
  mockedMyFlights,
  mockedMyFlightsList,
} from '@/myFlights/types/mocks';

import useMyFlights from '../subhooks/useMyFlights';

describe('useMyFlights', () => {
  const expectedDefaultState = {
    myFlights: mockedMyFlights,
    myFlightsList: mockedMyFlightsList,
    updateMyFlight: expect.any(Function),
    deleteMyFlight: expect.any(Function),
  };

  test('return default state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useMyFlights(mockedMyFlightsList));
    // Assert
    expect(result.current).toEqual(expectedDefaultState);
  });

  describe('when no data passed', () => {
    test('return default empty state', () => {
      // Arange
      const expectedState = {
        ...expectedDefaultState,
        myFlights: {},
        myFlightsList: [],
      };
      // Act
      const { result } = renderHook(() => useMyFlights(null));
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });

  describe('when flight was updated', () => {
    test('returns updated state', async () => {
      // Arange
      const updatedFlight = {
        ...mockedMyFlight1,
        attributes: { ...mockedMyFlight1.attributes, title: 'updated title1' },
      };
      const expectedState = {
        ...expectedDefaultState,
        myFlights: {
          ...expectedDefaultState.myFlights,
          [updatedFlight.id]: updatedFlight,
        },
        myFlightsList: [updatedFlight, mockedMyFlight2, mockedMyFlight3],
      };
      const { result } = renderHook(() => useMyFlights(mockedMyFlightsList));
      // Act
      await act(async () => {
        await result.current.updateMyFlight(updatedFlight);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });

  describe('when flight was deleted', () => {
    test('returns updated state', async () => {
      // Arange
      const expectedState = {
        ...expectedDefaultState,
        myFlights: {
          [mockedMyFlight1.id]: mockedMyFlight1,
          [mockedMyFlight2.id]: mockedMyFlight2,
        },
        myFlightsList: [mockedMyFlight1, mockedMyFlight2],
      };
      const { result } = renderHook(() => useMyFlights(mockedMyFlightsList));
      // Act
      await act(async () => {
        await result.current.deleteMyFlight(mockedMyFlight3.id);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });
});
