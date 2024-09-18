import { act, renderHook, waitFor } from '@testing-library/react';

import {
  mockedMyFlight1,
  mockedMyFlight2,
  mockedMyFlight3,
  mockedMyFlights,
  mockedMyFlightsList,
} from '@/myFlights/types/mocks';
import { MyFlightData } from '@/myFlights/types';

import useRetreiveData from '@/common/hooks/useRetreiveData';

import useMyFlights from '../subhooks/useMyFlights';

jest.mock('@/common/hooks/useRetreiveData');

describe('useMyFlights', () => {
  const expectedDefaultState = {
    myFlights: mockedMyFlights,
    myFlightsList: mockedMyFlightsList,
    updateMyFlight: expect.any(Function),
    deleteMyFlight: expect.any(Function),
  };

  const retreive = jest.fn();

  beforeEach(() => {
    (useRetreiveData as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ retreive }))
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('return default state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useMyFlights(mockedMyFlightsList));
    // Assert
    expect(result.current).toEqual(expectedDefaultState);
    expect(retreive).not.toBeCalled();
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
      expect(retreive).not.toBeCalled();
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
      expect(retreive).not.toBeCalled();
    });

    describe('when flight is new', () => {
      test('returns updated state', async () => {
        // Arange
        const newFlight = {
          id: 'new-flight',
          attributes: { origin: 'ORIGIN' },
        };
        const expectedState = {
          ...expectedDefaultState,
          myFlights: {
            [newFlight.id]: newFlight,
            ...expectedDefaultState.myFlights,
          },
          myFlightsList: [
            newFlight,
            mockedMyFlight1,
            mockedMyFlight2,
            mockedMyFlight3,
          ],
        };
        const { result } = renderHook(() => useMyFlights(mockedMyFlightsList));
        // Act
        await act(async () => {
          await result.current.updateMyFlight(newFlight as MyFlightData);
        });
        // Assert
        expect(result.current).toEqual(expectedState);
        expect(retreive).not.toBeCalled();
      });
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
      expect(retreive).not.toBeCalled();
    });
  });

  describe('when cursor passed', () => {
    const cursor1 = 'cursor1';
    const cursor2 = 'cursor2';

    const flight11 = { id: 'flight11', attributes: { origin: 'DXB' } };
    const flight12 = { id: 'flight12', attributes: { destination: 'DOH' } };
    const flights1 = [flight11, flight12];
    const flight21 = { id: 'flight21', attributes: { originName: 'Dubai' } };
    const flight22 = {
      id: 'flight22',
      attributes: { destinationName: 'Doha' },
    };
    const flights2 = [flight21, flight22];

    const expectedUrl1 = `/api/myFlights?cursor=${cursor1}`;
    const expectedUrl2 = `/api/myFlights?cursor=${cursor2}`;

    const retreive = jest.fn((url) =>
      url === expectedUrl1
        ? { data: flights1, nextCursor: cursor2 }
        : { data: flights2, nextCursor: null }
    );

    beforeEach(() => {
      (useRetreiveData as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({ retreive }))
      );
    });

    test('loads data until get no cursor', async () => {
      // Arange
      // Act
      const { result } = renderHook(() =>
        useMyFlights(mockedMyFlightsList, cursor1)
      );
      // Assert
      await waitFor(() => {
        expect(result.current).toEqual({
          ...expectedDefaultState,
          myFlights: {
            ...expectedDefaultState.myFlights,
            [flight11.id]: flight11,
            [flight12.id]: flight12,
            [flight21.id]: flight21,
            [flight22.id]: flight22,
          },
          myFlightsList: [
            ...expectedDefaultState.myFlightsList,
            flight11,
            flight12,
            flight21,
            flight22,
          ],
        });
        expect(retreive).toBeCalledTimes(2);
        expect(retreive).toBeCalledWith(expectedUrl1);
        expect(retreive).toBeCalledWith(expectedUrl2);
      });
    });
  });
});
