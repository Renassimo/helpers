import { cleanup, renderHook, act } from '@testing-library/react';
import useErrors from '../useErrors';

describe('useErrors', () => {
  afterEach(() => {
    cleanup();
  });

  test('returns empty errors', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useErrors());
    // Assert
    expect(result.current.errors).toEqual({});
  });

  describe('when add errors', () => {
    test('returns errors', async () => {
      // Arange
      const expectedErrors = {
        err1: 'err-1',
        err2: 'err-2',
      };
      const { result } = renderHook(() => useErrors());
      // Act
      await act(async () => {
        await result.current.addErrors({ err1: expectedErrors.err1 });
        await result.current.addErrors({ err2: expectedErrors.err2 });
      });
      // Assert
      expect(result.current.errors).toEqual(expectedErrors);
    });
  });
  describe('when clean errors', () => {
    test('returns empty errors', async () => {
      // Arange
      const mockedErrors = {
        err1: 'err-1',
        err2: 'err-2',
      };
      const { result } = renderHook(() => useErrors());
      // Act
      await act(async () => {
        await result.current.addErrors({ err1: mockedErrors.err1 });
        await result.current.addErrors({ err2: mockedErrors.err2 });
        await result.current.cleanErrors();
      });
      // Assert
      expect(result.current.errors).toEqual({});
    });
  });
});
