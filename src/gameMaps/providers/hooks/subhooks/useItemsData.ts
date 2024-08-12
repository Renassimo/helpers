import { useMemo, useState, useCallback } from 'react';

import { getAttributeObjectFromArray } from '@/common/utils/data';

import { ItemData, ItemsState } from '@/gameMaps/types';

const useItemsData = (
  itemsData: ItemData[]
): {
  items: ItemsState;
  itemsList: ItemData[];
  updateItem: (
    newData: ItemData | null,
    recountCategories?: (newItemsList: ItemData[]) => void,
    id?: string
  ) => void;
} => {
  // Items data
  const [items, setItems] = useState<ItemsState>(
    getAttributeObjectFromArray(itemsData)
  );
  const itemsList: ItemData[] = useMemo(() => Object.values(items), [items]);

  const updateItem = useCallback(
    (
      newData: ItemData | null,
      recountCategories?: (newItemsList: ItemData[]) => void,
      id?: string
    ) => {
      if (newData) {
        setItems((current) => {
          const newItemsState = {
            ...current,
            [newData.id]: newData,
          };
          const newItemsList = Object.values(newItemsState);
          recountCategories?.(newItemsList);
          return newItemsState;
        });
      } else {
        setItems((current) => {
          const newItemsState: ItemsState = {};
          for (const cat in current) {
            if (cat !== id) newItemsState[cat] = current[cat];
          }
          const newItemsList = Object.values(newItemsState);
          recountCategories?.(newItemsList);
          return newItemsState;
        });
      }
    },
    []
  );

  return {
    items,
    itemsList,
    updateItem,
  };
};

export default useItemsData;
