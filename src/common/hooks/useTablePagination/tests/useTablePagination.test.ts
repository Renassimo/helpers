import { ChangeEvent } from 'react';

import { act, cleanup, renderHook } from '@testing-library/react';

import useTablePagination from '../useTablePagination';

describe('useTablePagination', () => {
  const mockedRows = ['1', '2', '3', '4', '5'];
  const mockedRowsPerPageOptions = [2, 10];

  const expectedPaginationProps = {
    rowsPerPageOptions: mockedRowsPerPageOptions,
    component: 'div',
    count: mockedRows.length,
    rowsPerPage: mockedRowsPerPageOptions[0],
    page: 0,
    onPageChange: expect.any(Function),
    onRowsPerPageChange: expect.any(Function),
  };
  const expectedDefaultState = {
    paginationProps: expectedPaginationProps,
    rows: [mockedRows[0], mockedRows[1]],
  };

  afterEach(() => {
    cleanup();
  });

  test('returns default state', () => {
    // Arange
    // Act
    const { result } = renderHook(() =>
      useTablePagination(mockedRows, mockedRowsPerPageOptions)
    );
    // Assert
    expect(result.current).toEqual(expectedDefaultState);
  });

  describe('when page is changed', () => {
    test('returns updated state', async () => {
      // Arange
      const expectedResult = {
        paginationProps: { ...expectedPaginationProps, page: 1 },
        rows: [mockedRows[2], mockedRows[3]],
      };
      const { result } = renderHook(() =>
        useTablePagination(mockedRows, mockedRowsPerPageOptions)
      );
      // Act
      await act(async () => {
        await result.current.paginationProps.onPageChange(null, 1);
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });

  describe('when rows per page is changed', () => {
    test('returns updated state', async () => {
      // Arange
      const expectedResult = {
        paginationProps: { ...expectedPaginationProps, rowsPerPage: 3 },
        rows: [mockedRows[0], mockedRows[1], mockedRows[2]],
      };
      const mockedEvent = {
        target: { value: '3' },
      } as ChangeEvent<HTMLInputElement>;

      const { result } = renderHook(() =>
        useTablePagination(mockedRows, mockedRowsPerPageOptions)
      );
      await act(async () => {
        await result.current.paginationProps.onPageChange(null, 1);
      });
      // Act
      await act(async () => {
        await result.current.paginationProps.onRowsPerPageChange(mockedEvent);
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });

  describe('when rows is changed', () => {
    test('returns updated state', async () => {
      // Arange
      const mockedNewRows = ['6', '7', '8'];
      const expectedResult = {
        paginationProps: {
          ...expectedPaginationProps,
          count: mockedNewRows.length,
        },
        rows: [mockedNewRows[0], mockedNewRows[1]],
      };
      const initialProps = {
        rows: mockedRows,
        rowsPerPageOptions: mockedRowsPerPageOptions,
      };
      const { result, rerender } = renderHook(
        ({ rows, rowsPerPageOptions }) =>
          useTablePagination(rows, rowsPerPageOptions),
        { initialProps }
      );
      await act(async () => {
        await result.current.paginationProps.onPageChange(null, 1);
      });
      // Act
      rerender({
        rows: mockedNewRows,
        rowsPerPageOptions: mockedRowsPerPageOptions,
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });
});
