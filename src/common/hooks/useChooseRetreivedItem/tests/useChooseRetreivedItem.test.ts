import { act, cleanup, renderHook } from '@testing-library/react';

import useRetreiveData from '@/common/hooks/useRetreiveData';

import useChooseRetreivedItem from '../useChooseRetreivedItem';

jest.mock('@/common/hooks/useRetreiveData');

describe('useChooseRetreivedItem', () => {
  const mockedItem1 = { id: 'id1' };
  const mockedItem2 = { id: 'id2' };
  const mockedData = { data: [mockedItem1, mockedItem2] };
  const mockedError = 'mocked-error';
  const mockedLoading = 'mocked-loading';
  const mockedUrl = 'mocked-url';
  const mockedRetreiveItemsResult = 'mocked-retreive-items-result';
  const mockedRetreiveItems = jest.fn(() => mockedRetreiveItemsResult);
  const mockedUseRetreiveItemResult = {
    data: mockedData,
    error: mockedError,
    loading: mockedLoading,
    retreive: mockedRetreiveItems,
  };

  beforeEach(() => {
    (useRetreiveData as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedUseRetreiveItemResult)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const defaultState = {
    items: [mockedItem1, mockedItem2],
    chosenItem: null,
    retreiveItems: mockedRetreiveItems,
    chooseItem: expect.any(Function),
    clearChosenItem: expect.any(Function),
    loading: mockedLoading,
    error: mockedError,
  };

  test('returns default state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useChooseRetreivedItem(mockedUrl));
    // Assert
    expect(result.current).toEqual(defaultState);
    expect(useRetreiveData).toBeCalledWith(mockedUrl);
  });

  describe('when retreives items', () => {
    test('returns updated state', async () => {
      // Arange
      const { result } = renderHook(() => useChooseRetreivedItem());
      // Act
      let responseData = '';
      await act(async () => {
        responseData = (await result.current.retreiveItems(
          mockedUrl
        )) as unknown as string;
      });
      // Assert
      expect(result.current).toEqual(defaultState);
      expect(mockedRetreiveItems).toBeCalledWith(mockedUrl);
      expect(useRetreiveData).toBeCalledWith(undefined);
      expect(responseData).toEqual(mockedRetreiveItemsResult);
    });
  });

  describe('when retreives only one item', () => {
    test('returns updated state with chosen item', async () => {
      // Arange
      (useRetreiveData as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({
          ...mockedUseRetreiveItemResult,
          data: { data: [mockedItem1] },
        }))
      );
      // Act
      const { result } = renderHook(() => useChooseRetreivedItem());
      await act(async () => {});
      // Assert
      expect(result.current).toEqual({
        ...defaultState,
        items: [mockedItem1],
        chosenItem: mockedItem1,
      });
    });
  });

  describe('when choses items', () => {
    test('returns updated state with chosen item', async () => {
      // Arange
      const { result } = renderHook(() => useChooseRetreivedItem());
      // Act
      let res;
      await act(async () => {
        res = await result.current.chooseItem(mockedItem2.id);
      });
      // Assert
      expect(result.current).toEqual({
        ...defaultState,
        chosenItem: mockedItem2,
      });
      expect(res).toEqual(mockedItem2);
    });
  });

  describe('when clears chosen items', () => {
    test('returns updated state', async () => {
      // Arange
      const { result } = renderHook(() => useChooseRetreivedItem());
      await act(async () => {
        await result.current.chooseItem(mockedItem2.id);
      });
      // Act
      let res;
      await act(async () => {
        res = await result.current.clearChosenItem();
      });
      // Assert
      expect(result.current).toEqual(defaultState);
      expect(res).toEqual(null);
    });
  });
});
