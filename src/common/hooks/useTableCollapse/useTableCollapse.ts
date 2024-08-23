import { useState } from 'react';

const useTableCollapse = (): [string | null, (id: string) => void] => {
  const [openedRowId, setOpenedRowId] = useState<string | null>(null);

  const toggleOpenRowId = (id: string) =>
    setOpenedRowId((currentId) => (currentId === id ? null : id));

  return [openedRowId, toggleOpenRowId];
};

export default useTableCollapse;
