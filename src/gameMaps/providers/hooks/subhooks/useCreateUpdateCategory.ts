import { useCallback, useMemo, useState } from 'react';

import useAlerts from '@/common/hooks/alerts';

import { CategoriesState, CategoryData } from '@/gameMaps/types';

const useCreateUpdateCategory = (
  categories: CategoriesState,
  updateCategory: (category: CategoryData | null, id?: string) => void
): {
  isCategoryEditOpen: boolean;
  setIsCategoryEditOpen: (newState: boolean) => void;
  editingCategory: CategoryData | null;
  openCategoryCreating: () => void;
  openCategoryUpdating: (id: string) => void;
  updateSubmittedCategory: (newData: CategoryData | null, id?: string) => void;
} => {
  const { createSuccessAlert } = useAlerts();

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
        updateCategory(null, id);
        createSuccessAlert(`Category was deleted!`);
      } else {
        updateCategory({
          ...newData,
          attributes: { ...newData.attributes, chosen: true },
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
