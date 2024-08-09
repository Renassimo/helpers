import { useMemo, useState, Dispatch, SetStateAction } from 'react';

import { getAttributeObjectFromArray } from '@/common/utils/data';

import { ItemData, ItemsState } from '@/gameMaps/types';

const useItemsData = (
  itemsData: ItemData[]
): {
  items: ItemsState;
  setItems: Dispatch<SetStateAction<ItemsState>>;
  itemsList: ItemData[];
} => {
  // Items data
  const [items, setItems] = useState(getAttributeObjectFromArray(itemsData));
  const itemsList: ItemData[] = useMemo(() => Object.values(items), [items]);

  return {
    items,
    setItems,
    itemsList,
  };
};

export default useItemsData;
