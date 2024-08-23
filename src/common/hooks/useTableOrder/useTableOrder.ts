import { useCallback, useMemo, useState } from 'react';

const useTableOrder = <L>(
  list: L[],
  reversed = false
): { orderedList: L[]; isReversedOrder: boolean; reverse: () => void } => {
  const [isReversedOrder, setIsReversedOrder] = useState(reversed);

  const orderedList: L[] = useMemo(() => {
    return isReversedOrder ? [...list].reverse() : list;
  }, [list, isReversedOrder]);

  const reverse = useCallback(
    () => setIsReversedOrder((currentOrder) => !currentOrder),
    []
  );

  return {
    orderedList,
    isReversedOrder,
    reverse,
  };
};

export default useTableOrder;
