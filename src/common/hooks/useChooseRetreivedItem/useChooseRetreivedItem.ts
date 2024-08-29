import { useCallback, useEffect, useMemo, useState } from 'react';

import { CommonError } from '@/common/types/errors';

import useRetreiveData from '@/common/hooks/useRetreiveData';

const useChooseRetreivedItem = <D extends { id: string; attributes: any }>(
  url?: string
): {
  items: D[];
  chosenItem: D | null;
  retreiveItems: (url: string) => Promise<{ data: D[] } | null>;
  chooseItem: (id: string) => D | null;
  clearChosenItem: () => null;
  loading: boolean;
  error: CommonError | null;
  cleanUp: () => void;
} => {
  const {
    data,
    retreive: retreiveItems,
    loading,
    error,
    cleanData,
  } = useRetreiveData<{ data: D[] }>(url);
  const items = useMemo(() => data?.data ?? [], [data]);
  const [chosenItem, setChosenItem] = useState<D | null>(null);

  const chooseItem = useCallback(
    (id: string) => {
      const item = items.find((item) => item.id === id);
      if (item) {
        setChosenItem(item);
        return item;
      }
      return null;
    },
    [items]
  );

  const clearChosenItem = useCallback(() => {
    setChosenItem(null);
    return null;
  }, []);

  const cleanUp = useCallback(() => {
    cleanData();
    clearChosenItem();
  }, []);

  useEffect(() => {
    if (items.length === 1) chooseItem(items[0].id);
  }, [items]);

  return {
    items,
    chosenItem,
    retreiveItems,
    chooseItem,
    clearChosenItem,
    loading,
    error,
    cleanUp,
  };
};

export default useChooseRetreivedItem;
