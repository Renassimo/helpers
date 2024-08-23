import { useState, ChangeEvent, useMemo, useEffect } from 'react';

const useTablePagination = <R>(
  rows: R[],
  rowsPerPageOptions: number[] = [10, 25]
): {
  paginationProps: {
    rowsPerPageOptions: number[];
    component: 'div';
    count: number;
    rowsPerPage: number;
    page: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  rows: R[];
} => {
  const rowsCount = rows.length;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] ?? 10);

  const visibleRows: R[] = useMemo(() => {
    const start = page * rowsPerPage;
    const finish = start + rowsPerPage;
    const end = finish > rowsCount ? rowsCount : finish;
    const result = [];
    for (let i = start; i < end; i++) {
      const row = rows[i];
      if (row) result.push(row);
    }
    return result;
  }, [page, rowsPerPage, rows]);

  const onPageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setPage(0);
  }, [rows]);

  return {
    paginationProps: {
      rowsPerPageOptions,
      component: 'div',
      count: rowsCount,
      rowsPerPage,
      page,
      onPageChange,
      onRowsPerPageChange,
    },
    rows: visibleRows,
  };
};

export default useTablePagination;
