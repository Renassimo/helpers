import { useMemo, useState } from 'react';

import search from '@/common/utils/search';

const useFilter = <I extends { id: string; attributes: Record<string, any> }>(
  items: I[],
  keys: string[]
) => {
  const [filterQuery, setFilterQuery] = useState('');

  const visibleItems = useMemo(() => {
    return items.filter((item) => {
      return keys.some((key) => search(item.attributes[key], filterQuery));
    });
  }, [items, filterQuery]);

  return {
    filterQuery,
    setFilterQuery,
    visibleItems,
  };
};

export default useFilter;
