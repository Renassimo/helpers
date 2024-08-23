import { act, cleanup, renderHook } from '@testing-library/react';

import useTableCollapse from '../useTableCollapse';

describe('useTableCollapse', () => {
  afterEach(() => {
    cleanup();
  });

  test('returns default state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useTableCollapse());
    // Assert
    expect(result.current).toEqual([null, expect.any(Function)]);
  });

  describe('when sets opened id', () => {
    test('returns updated state with id', async () => {
      // Arange
      const { result } = renderHook(() => useTableCollapse());
      // Act
      await act(async () => {
        await result.current[1]('id1');
      });
      // Assert
      expect(result.current).toEqual(['id1', expect.any(Function)]);
    });
  });

  describe('when sets another opened id', () => {
    test('returns updated state with new id', async () => {
      // Arange
      const { result } = renderHook(() => useTableCollapse());
      await act(async () => {
        await result.current[1]('id1');
      });
      // Act
      await act(async () => {
        await result.current[1]('id2');
      });
      // Assert
      expect(result.current).toEqual(['id2', expect.any(Function)]);
    });
  });

  describe('when sets the same opened id again', () => {
    test('returns updated state with null id', async () => {
      // Arange
      const { result } = renderHook(() => useTableCollapse());
      await act(async () => {
        await result.current[1]('id1');
      });
      // Act
      await act(async () => {
        await result.current[1]('id1');
      });
      // Assert
      expect(result.current).toEqual([null, expect.any(Function)]);
    });
  });
});
