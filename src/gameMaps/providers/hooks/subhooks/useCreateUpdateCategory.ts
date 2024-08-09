import {
  useCallback,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

import useAlerts from '@/common/hooks/alerts';

import getCategoriesStateWithCountedItems from '@/gameMaps/utils/getCategoriesStateWithCountedItems';

import { CategoriesState, CategoryData, ItemData } from '@/gameMaps/types';

const useCreateUpdateCategory = (
  categories: CategoriesState,
  setCategories: Dispatch<SetStateAction<CategoriesState>>,
  itemsList: ItemData[]
): {
  isCategoryEditOpen: boolean;
  setIsCategoryEditOpen: (newState: boolean) => void;
  editingCategory: CategoryData | null;
  openCategoryCreating: () => void;
  openCategoryUpdating: (id: string) => void;
  updateSubmittedCategory: (newData: CategoryData | null, id?: string) => void;
} => {
  const { createSuccessAlert } = useAlerts();
  // Category editing and creating
  const [isCategoryEditOpen, setIsCategoryEditOpen] = useState<boolean>(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const editingCategory: CategoryData | null = useMemo(
    () => (editingCategoryId ? categories[editingCategoryId] : null),
    [editingCategoryId, categories]
  );
  const openCategoryCreating = () => setIsCategoryEditOpen(true);
  const openCategoryUpdating = (id: string) => {
    setEditingCategoryId(id);
    setIsCategoryEditOpen(true);
  };
  const updateSubmittedCategory = useCallback(
    (newData: CategoryData | null, id?: string) => {
      if (newData == null) {
        setCategories((current) => {
          const newState: CategoriesState = {};
          for (const cat in current) {
            if (cat !== id) newState[cat] = current[cat];
          }
          return newState;
        });
        createSuccessAlert(`Category was deleted!`);
      } else {
        setCategories((current) => {
          return {
            ...current,
            ...getCategoriesStateWithCountedItems(
              {
                [newData.id]: {
                  ...newData,
                  attributes: { ...newData.attributes, chosen: true },
                },
              },
              itemsList
            ),
          };
        });
        createSuccessAlert(`Categories were updated!`);
      }
      setEditingCategoryId(null);
    },
    []
  );

  return {
    isCategoryEditOpen,
    setIsCategoryEditOpen,
    editingCategory,
    openCategoryCreating,
    openCategoryUpdating,
    updateSubmittedCategory,
  };
};

export default useCreateUpdateCategory;
