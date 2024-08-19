import { useCallback, useMemo, useState } from 'react';

import useAlerts from '@/common/hooks/alerts';

import { ItemData, ItemsState } from '@/gameMaps/types';

const useCreateUpdateItem = (
  items: ItemsState,
  updateItem: (
    newData: ItemData | null,
    recountCategories?: (newItemsList: ItemData[]) => void,
    id?: string
  ) => void,
  recountCategories: (newItemsList: ItemData[]) => void
): {
  isItemEditOpen: boolean;
  creatingItemCoordinates: [number, number] | null;
  pointingCategoryId: string | null;
  editingItem: ItemData | null;
  setIsItemEditOpen: (newState: boolean) => void;
  setPointingCategoryId: (id: string | null) => void;
  openItemCreating: (coordinates: [number, number]) => void;
  openItemUpdating: (id: string) => void;
  updateSubmittedItem: (newData: ItemData | null, id?: string) => void;
  quitFromCreatingNewItem: () => void;
  clearItemEditing: () => void;
} => {
  const { createSuccessAlert, clearAll } = useAlerts();

  const [isItemEditOpen, setIsItemEditOpen] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const clearItemEditing = useCallback(() => setEditingItemId(null), []);
  const [creatingItemCoordinates, setCreatingItemCoordinates] = useState<
    [number, number] | null
  >(null);
  const [pointingCategoryId, setPointingCategoryId] = useState<string | null>(
    null
  );
  const editingItem: ItemData | null = useMemo(
    () => (editingItemId ? items[editingItemId] : null),
    [editingItemId, items]
  );
  const openItemCreating = (coordinates: [number, number]) => {
    setCreatingItemCoordinates(coordinates);
    setIsItemEditOpen(true);
  };
  const openItemUpdating = (id: string) => {
    setEditingItemId(id);
    setIsItemEditOpen(true);
  };
  const updateSubmittedItem = useCallback(
    (newData: ItemData | null, id?: string) => {
      if (newData) {
        updateItem(
          { ...newData, attributes: { ...newData.attributes, recent: true } },
          recountCategories
        );
        createSuccessAlert(`Items were updated!`);
      } else {
        updateItem(null, recountCategories, id);
        createSuccessAlert(`Item was deleted!`);
      }
      clearItemEditing();
      setPointingCategoryId(null);
      setCreatingItemCoordinates(null);
    },
    []
  );
  const quitFromCreatingNewItem = useCallback(() => {
    clearAll();
    setPointingCategoryId(null);
    setCreatingItemCoordinates(null);
    setIsItemEditOpen(false);
  }, [clearAll]);

  return {
    isItemEditOpen,
    creatingItemCoordinates,
    pointingCategoryId,
    editingItem,
    setIsItemEditOpen,
    setPointingCategoryId,
    openItemCreating,
    openItemUpdating,
    updateSubmittedItem,
    quitFromCreatingNewItem,
    clearItemEditing,
  };
};

export default useCreateUpdateItem;
