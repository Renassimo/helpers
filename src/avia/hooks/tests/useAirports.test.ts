import useChooseRetreivedItem from '@/common/hooks/useChooseRetreivedItem';
import { act, renderHook } from '@testing-library/react';
import useAirports from '../useAirports';

jest.mock('@/common/hooks/useChooseRetreivedItem');

describe('useAirports', () => {
  const mockedItems = 'mocked-items';
  const mockedChosenItem = 'mocked-chosen-item';
  const mockedRetreiveItemsResult = 'mocked-retreive-items-result';
  const mockedRetreiveItems = jest.fn(() => mockedRetreiveItemsResult);
  const mockedChooseItem = jest.fn();
  const mockedClearChosenItem = jest.fn();

  const defaultState = {
    airports: mockedItems,
    chosenAirport: mockedChosenItem,
    retreiveAirports: expect.any(Function),
    chooseAirport: mockedChooseItem,
    clearChosenAirport: mockedClearChosenItem,
  };

  beforeEach(() => {
    (useChooseRetreivedItem as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => ({
        items: mockedItems,
        chosenItem: mockedChosenItem,
        retreiveItems: mockedRetreiveItems,
        chooseItem: mockedChooseItem,
        clearChosenItem: mockedClearChosenItem,
      }))
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns default state and retreives airports', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useAirports());
    // Assert
    expect(result.current).toEqual(defaultState);
  });

  describe('when retreives airports', () => {
    describe('with code', () => {
      const props = {
        code: 'WAW',
      };

      test('returns default state and retreive items', async () => {
        // Arange
        const { result } = renderHook(() => useAirports());
        // Act
        let responseData: string | null = '';
        await act(async () => {
          responseData = (await result.current.retreiveAirports(
            props
          )) as unknown as string;
        });
        // Assert
        expect(result.current).toEqual(defaultState);
        expect(mockedRetreiveItems).toBeCalledWith(
          '/api/avia/airports?code=WAW'
        );
        expect(responseData).toEqual(mockedRetreiveItemsResult);
        expect(mockedChooseItem).not.toBeCalled();
        expect(mockedClearChosenItem).not.toBeCalled();
      });
    });

    describe('with text', () => {
      const props = {
        text: 'Kazan',
      };

      test('returns default state and retreive items', async () => {
        // Arange
        const { result } = renderHook(() => useAirports());
        // Act
        let responseData: string | null = '';
        await act(async () => {
          responseData = (await result.current.retreiveAirports(
            props
          )) as unknown as string;
        });
        // Assert
        expect(result.current).toEqual(defaultState);
        expect(mockedRetreiveItems).toBeCalledWith(
          '/api/avia/airports?text=Kazan'
        );
        expect(responseData).toEqual(mockedRetreiveItemsResult);
        expect(mockedChooseItem).not.toBeCalled();
        expect(mockedClearChosenItem).not.toBeCalled();
      });
    });

    describe('with location', () => {
      const props = {
        lat: '25',
        lon: '49',
      };

      test('returns default state and retreive items', async () => {
        // Arange
        const { result } = renderHook(() => useAirports());
        // Act
        let responseData: string | null = '';
        await act(async () => {
          responseData = (await result.current.retreiveAirports(
            props
          )) as unknown as string;
        });
        // Assert
        expect(result.current).toEqual(defaultState);
        expect(mockedRetreiveItems).toBeCalledWith(
          '/api/avia/airports?lat=25&lon=49'
        );
        expect(responseData).toEqual(mockedRetreiveItemsResult);
        expect(mockedChooseItem).not.toBeCalled();
        expect(mockedClearChosenItem).not.toBeCalled();
      });
    });

    describe('with wrong props', () => {
      const props = {
        lat: '25',
      };

      test('returns default state and retreive items', async () => {
        // Arange
        const { result } = renderHook(() => useAirports());
        // Act
        let responseData: string | null = '';
        await act(async () => {
          responseData = (await result.current.retreiveAirports(
            props
          )) as unknown as string;
        });
        // Assert
        expect(result.current).toEqual(defaultState);
        expect(mockedRetreiveItems).not.toBeCalled();
        expect(responseData).toEqual(null);
        expect(mockedChooseItem).not.toBeCalled();
        expect(mockedClearChosenItem).not.toBeCalled();
      });
    });
  });

  describe('when calls chooseAirport', () => {
    test('returns default state and calls mockedChooseItem', async () => {
      // Arange
      const { result } = renderHook(() => useAirports());
      // Act
      await act(async () => {
        await result.current.chooseAirport('id1');
      });
      // Assert
      expect(result.current).toEqual(defaultState);
      expect(mockedRetreiveItems).not.toBeCalled();
      expect(mockedChooseItem).toBeCalledWith('id1');
      expect(mockedClearChosenItem).not.toBeCalled();
    });
  });

  describe('when calls clearChosenAirport', () => {
    test('returns default state and calls mockedChooseItem', async () => {
      // Arange
      const { result } = renderHook(() => useAirports());
      // Act
      await act(async () => {
        await result.current.clearChosenAirport();
      });
      // Assert
      expect(result.current).toEqual(defaultState);
      expect(mockedRetreiveItems).not.toBeCalled();
      expect(mockedChooseItem).not.toBeCalled();
      expect(mockedClearChosenItem).toBeCalledWith();
    });
  });
});
