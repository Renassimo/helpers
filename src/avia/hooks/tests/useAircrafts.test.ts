import useChooseRetreivedItem from '@/common/hooks/useChooseRetreivedItem';
import { act, renderHook } from '@testing-library/react';
import useAircrafts from '../useAircrafts';

jest.mock('@/common/hooks/useChooseRetreivedItem');

describe('useAircrafts', () => {
  const mockedItems = 'mocked-items';
  const mockedChosenItem = 'mocked-chosen-item';
  const mockedRetreiveItemsResult = 'mocked-retreive-items-result';
  const mockedRetreiveItems = jest.fn(() => mockedRetreiveItemsResult);
  const mockedChooseItem = jest.fn();
  const mockedClearChosenItem = jest.fn();

  const defaultState = {
    aircrafts: mockedItems,
    chosenAircraft: mockedChosenItem,
    retreiveAircrafts: expect.any(Function),
    chooseAircraft: mockedChooseItem,
    clearChosenAircraft: mockedClearChosenItem,
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

  test('returns default state and retreives aircrafts', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useAircrafts());
    // Assert
    expect(result.current).toEqual(defaultState);
  });

  describe('when retreives aircrafts', () => {
    test('returns default state and retreive items', async () => {
      // Arange
      const { result } = renderHook(() => useAircrafts());
      // Act
      let responseData: string | null = '';
      await act(async () => {
        responseData = (await result.current.retreiveAircrafts(
          'reg'
        )) as unknown as string;
      });
      // Assert
      expect(result.current).toEqual(defaultState);
      expect(mockedRetreiveItems).toBeCalledWith('/api/avia/aircrafts/reg');
      expect(responseData).toEqual(mockedRetreiveItemsResult);
      expect(mockedChooseItem).not.toBeCalled();
      expect(mockedClearChosenItem).not.toBeCalled();
    });
  });

  describe('when calls chooseAircraft', () => {
    test('returns default state and calls mockedChooseItem', async () => {
      // Arange
      const { result } = renderHook(() => useAircrafts());
      // Act
      await act(async () => {
        await result.current.chooseAircraft('id1');
      });
      // Assert
      expect(result.current).toEqual(defaultState);
      expect(mockedRetreiveItems).not.toBeCalled();
      expect(mockedChooseItem).toBeCalledWith('id1');
      expect(mockedClearChosenItem).not.toBeCalled();
    });
  });

  describe('when calls clearChosenAircraft', () => {
    test('returns default state and calls mockedChooseItem', async () => {
      // Arange
      const { result } = renderHook(() => useAircrafts());
      // Act
      await act(async () => {
        await result.current.clearChosenAircraft();
      });
      // Assert
      expect(result.current).toEqual(defaultState);
      expect(mockedRetreiveItems).not.toBeCalled();
      expect(mockedChooseItem).not.toBeCalled();
      expect(mockedClearChosenItem).toBeCalledWith();
    });
  });
});
