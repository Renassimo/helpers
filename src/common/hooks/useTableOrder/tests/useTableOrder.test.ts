import { act, cleanup, renderHook } from '@testing-library/react';

import useTableOrder from '../useTableOrder';

describe('useTableOrder', () => {
  const mockedList = ['1', '2', '3', '4'];
  const mockedReversedList = ['4', '3', '2', '1'];

  afterEach(() => {
    cleanup();
  });

  test('returns default state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useTableOrder(mockedList));
    // Assert
    expect(result.current).toEqual({
      orderedList: mockedList,
      isReversedOrder: false,
      reverse: expect.any(Function),
    });
  });

  describe('when reversed passed', () => {
    test('returns state with list in reversed order', () => {
      // Arange
      // Act
      const { result } = renderHook(() => useTableOrder(mockedList, true));
      // Assert
      expect(result.current).toEqual({
        orderedList: mockedReversedList,
        isReversedOrder: true,
        reverse: expect.any(Function),
      });
    });
  });

  describe('when calls reverse', () => {
    test('returns state with list in reversed order', async () => {
      // Arange
      const { result } = renderHook(() => useTableOrder(mockedList));
      // Act
      await act(async () => {
        await result.current.reverse();
      });
      // Assert
      expect(result.current).toEqual({
        orderedList: mockedReversedList,
        isReversedOrder: true,
        reverse: expect.any(Function),
      });
    });
  });
});
