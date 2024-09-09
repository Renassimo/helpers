import useChooseRetreivedItem from '@/common/hooks/useChooseRetreivedItem';
import { act, renderHook } from '@testing-library/react';
import useFlights from '../useFlights';

jest.mock('@/common/hooks/useChooseRetreivedItem');

describe('useFlights', () => {
  const mockedItems = 'mocked-items';
  const mockedChosenItem = 'mocked-chosen-item';
  const mockedRetreiveItemsResult = 'mocked-retreive-items-result';
  const mockedRetreiveItems = jest.fn(() => mockedRetreiveItemsResult);
  const mockedChooseItem = jest.fn();
  const mockedClearChosenItem = jest.fn();
  const mockedCleanUp = jest.fn();

  const defaultState = {
    flights: mockedItems,
    chosenFlight: mockedChosenItem,
    retreiveFlights: expect.any(Function),
    chooseFlight: mockedChooseItem,
    clearChosenFlight: mockedClearChosenItem,
    loading: false,
    cleanUpFlights: mockedCleanUp,
  };

  beforeEach(() => {
    (useChooseRetreivedItem as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => ({
        items: mockedItems,
        chosenItem: mockedChosenItem,
        retreiveItems: mockedRetreiveItems,
        chooseItem: mockedChooseItem,
        clearChosenItem: mockedClearChosenItem,
        loading: false,
        cleanUp: mockedCleanUp,
      }))
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns default state and retreives flights', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useFlights());
    // Assert
    expect(result.current).toEqual(defaultState);
  });

  describe('when retreives flights', () => {
    test('returns default state and retreive items', async () => {
      // Arange
      const { result } = renderHook(() => useFlights());
      let responseData: string | null = '';
      // Act
      await act(async () => {
        responseData = (await result.current.retreiveFlights(
          'flight-number'
        )) as unknown as string;
      });
      // Assert
      expect(result.current).toEqual(defaultState);
      expect(mockedRetreiveItems).toBeCalledWith(
        '/api/avia/flights/flight-number'
      );
      expect(responseData).toEqual(mockedRetreiveItemsResult);
      expect(mockedChooseItem).not.toBeCalled();
      expect(mockedClearChosenItem).not.toBeCalled();
      expect(mockedCleanUp).not.toBeCalled();
    });

    describe('when retreives flights with date', () => {
      test('returns default state and retreive items', async () => {
        // Arange
        const { result } = renderHook(() => useFlights());
        let responseData: string | null = '';
        // Act
        await act(async () => {
          responseData = (await result.current.retreiveFlights(
            'flight-number',
            'mocked-date'
          )) as unknown as string;
        });
        // Assert
        expect(result.current).toEqual(defaultState);
        expect(mockedRetreiveItems).toBeCalledWith(
          '/api/avia/flights/flight-number?date=mocked-date'
        );
        expect(responseData).toEqual(mockedRetreiveItemsResult);
        expect(mockedChooseItem).not.toBeCalled();
        expect(mockedClearChosenItem).not.toBeCalled();
        expect(mockedCleanUp).not.toBeCalled();
      });
    });
  });

  describe('when calls chooseFlight', () => {
    test('returns default state and calls mockedChooseItem', async () => {
      // Arange
      const { result } = renderHook(() => useFlights());
      // Act
      await act(async () => {
        await result.current.chooseFlight('id1');
      });
      // Assert
      expect(result.current).toEqual(defaultState);
      expect(mockedRetreiveItems).not.toBeCalled();
      expect(mockedChooseItem).toBeCalledWith('id1');
      expect(mockedClearChosenItem).not.toBeCalled();
      expect(mockedCleanUp).not.toBeCalled();
    });
  });

  describe('when calls clearChosenFlight', () => {
    test('returns default state and calls mockedChooseItem', async () => {
      // Arange
      const { result } = renderHook(() => useFlights());
      // Act
      await act(async () => {
        await result.current.clearChosenFlight();
      });
      // Assert
      expect(result.current).toEqual(defaultState);
      expect(mockedRetreiveItems).not.toBeCalled();
      expect(mockedChooseItem).not.toBeCalled();
      expect(mockedClearChosenItem).toBeCalledWith();
      expect(mockedCleanUp).not.toBeCalled();
    });
  });

  describe('when calls cleanUpFlights', () => {
    test('returns default state and calls cleanUp', async () => {
      // Arange
      const { result } = renderHook(() => useFlights());
      // Act
      await act(async () => {
        await result.current.cleanUpFlights();
      });
      // Assert
      expect(result.current).toEqual(defaultState);
      expect(mockedRetreiveItems).not.toBeCalled();
      expect(mockedChooseItem).not.toBeCalled();
      expect(mockedClearChosenItem).not.toBeCalled();
      expect(mockedCleanUp).toBeCalledWith();
    });
  });
});
