import {
  useCallback,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

import useAlerts from '@/common/hooks/alerts';

import getCategoriesStateWithCountedItems from '@/gameMaps/utils/getCategoriesStateWithCountedItems';

import { CategoriesState, ItemData, ItemsState } from '@/gameMaps/types';

const useCreateUpdateItem = (
  items: ItemsState,
  setItems: Dispatch<SetStateAction<ItemsState>>,
  setCategories: Dispatch<SetStateAction<CategoriesState>>
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
} => {
  const { createSuccessAlert, clearAll } = useAlerts();

  const [isItemEditOpen, setIsItemEditOpen] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
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
      if (newData == null) {
        setItems((current) => {
          const newItemsState: ItemsState = {};
          for (const cat in current) {
            if (cat !== id) newItemsState[cat] = current[cat];
          }
          const newItemsList = Object.values(newItemsState);
          setCategories((current) =>
            getCategoriesStateWithCountedItems(current, newItemsList)
          );
          return newItemsState;
        });
        createSuccessAlert(`Item was deleted!`);
      } else {
        setItems((current) => {
          const newItemsState = {
            ...current,
            [newData.id]: newData,
          };
          const newItemsList = Object.values(newItemsState);
          setCategories((current) => ({
            ...current,
            ...getCategoriesStateWithCountedItems(
              {
                [newData.attributes.categoryId]:
                  current[newData.attributes.categoryId],
              },
              newItemsList
            ),
          }));
          return newItemsState;
        });
        createSuccessAlert(`Items were updated!`);
      }
      setEditingItemId(null);
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
  };
};

export default useCreateUpdateItem;
