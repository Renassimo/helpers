import { useCallback, useMemo, useState } from 'react';

import useAlerts from '@/common/hooks/alerts';

import updateItem from '@/gameMaps/handlers/client/updateItem';

import { GameData, ItemData, ItemsState } from '@/gameMaps/types';
import { CommonError } from '@/common/types/errors';

const useUpdateItemCoordinates = (
  game: GameData | null,
  items: ItemsState,
  setPointingCategoryId: (id: string | null) => void,
  updateSubmittedItem: (newData: ItemData | null, id?: string) => void
): {
  relocateItem: (id: string | null) => void;
  relocatingItem: ItemData | null;
  updateItemCoordinates: (coordinates: [number, number]) => void;
} => {
  // updating item coordinates
  const { createSuccessAlert, clearAll, createErrorAlert, createInfoAlert } =
    useAlerts();
  const [relocatingItemId, setRelocatingItemId] = useState<string | null>(null);
  const relocateItem = useCallback((id: string | null) => {
    if (id) setPointingCategoryId(null);
    setRelocatingItemId(id);
  }, []);
  const relocatingItem: ItemData | null = useMemo(() => {
    if (!relocatingItemId) return null;

    const relocatingItemData = items[relocatingItemId];
    if (!relocatingItemData) return null;

    return relocatingItemData;
  }, [items, relocatingItemId]);

  const updateItemCoordinates = useCallback(
    async (coordinates: [number, number]) => {
      const gameId = game?.id;
      try {
        if (!gameId || !relocatingItemId || !coordinates)
          throw new Error('Not all parameters passed');
        clearAll();
        createInfoAlert(`Updating item coordinates...`);
        const data = await updateItem(gameId, relocatingItemId, {
          coordinates,
        });
        setRelocatingItemId(null);
        updateSubmittedItem(data);
        clearAll();
        createSuccessAlert(`Item coordinates updated`);
      } catch (error: unknown) {
        const { message } = error as CommonError;
        clearAll();
        createErrorAlert(message);
      }
    },
    [game, relocatingItemId]
  );

  return {
    relocateItem,
    relocatingItem,
    updateItemCoordinates,
  };
};

export default useUpdateItemCoordinates;
