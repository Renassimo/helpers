import { useCallback, useState } from 'react';

import useAlerts from '@/common/hooks/alerts';

import updateItem from '@/gameMaps/handlers/client/updateItem';

import { GameData, ItemData, PlayData } from '@/gameMaps/types';
import { CommonError } from '@/common/types/errors';

const useUpdateItemCollection = (
  game: GameData | null,
  play: PlayData | null,
  updateSubmittedItem: (newData: ItemData | null, id?: string) => void
): {
  updateItemCollection: (itemId: string, collected: boolean) => void;
  loading: boolean;
} => {
  const { createSuccessAlert, clearAll, createErrorAlert, createInfoAlert } =
    useAlerts();
  const [loading, setLoading] = useState(false);

  const updateItemCollection = useCallback(
    async (itemId: string, collected: boolean) => {
      const gameId = game?.id;
      setLoading(true);
      try {
        if (!gameId || !itemId || typeof collected !== 'boolean')
          throw new Error('Not all parameters passed');
        clearAll();
        createInfoAlert(`Updating item collection...`);
        const data = await updateItem(gameId, itemId, {
          collected,
          playId: play?.id,
        });
        updateSubmittedItem(data);
        setLoading(false);
        clearAll();
        createSuccessAlert(`Item collection updated`);
      } catch (error: unknown) {
        const { message } = error as CommonError;
        setLoading(false);
        clearAll();
        createErrorAlert(message);
      }
    },
    [game, play]
  );

  return {
    updateItemCollection,
    loading,
  };
};

export default useUpdateItemCollection;
