import { PlayContextData, PlayPageData } from '@/gameMaps/types';

import usePlayData from './subhooks/usePlayData';
import useCategoriesData from './subhooks/useCategoriesData';
import useCreateUpdateCategory from './subhooks/useCreateUpdateCategory';
import useItemsData from './subhooks/useItemsData';
import useCreateUpdateItem from './subhooks/useCreateUpdateItem';
import useUpdateItemCoordinates from './subhooks/useUpdateItemCoordinates';

const usePlayProvider = (data: PlayPageData | null): PlayContextData => {
  const {
    gameData: game = null,
    playData = null,
    categoriesData = [],
    itemsData = [],
  } = data ?? {};

  // Play data
  const { play, updateSubmittedPlay, isPlayEditOpen, setIsPlayEditOpen } =
    usePlayData(game, playData);

  // Items data
  const { items, itemsList, updateItem } = useItemsData(itemsData);

  // Categories data
  const {
    categories,
    updateCategory,
    recountCategories,
    categoriesList,
    visibleItems,
    choseAllCategories,
    clearAllChosenCategories,
    changeCategoryChoose,
    isEveryCategoryChosen,
    isNoCategoriesChosen,
  } = useCategoriesData(categoriesData, itemsList);

  // Category creating and editing
  const {
    isCategoryEditOpen,
    setIsCategoryEditOpen,
    editingCategory,
    openCategoryCreating,
    openCategoryUpdating,
    updateSubmittedCategory,
  } = useCreateUpdateCategory(categories, updateCategory);

  // Item creating and updating
  const {
    isItemEditOpen,
    creatingItemCoordinates,
    pointingCategoryId,
    editingItem,
    setPointingCategoryId,
    setIsItemEditOpen,
    openItemCreating,
    openItemUpdating,
    updateSubmittedItem,
    quitFromCreatingNewItem,
  } = useCreateUpdateItem(items, updateItem, recountCategories);

  // Updating item coordinates
  const { relocateItem, relocatingItem, updateItemCoordinates } =
    useUpdateItemCoordinates(
      game,
      items,
      setPointingCategoryId,
      updateSubmittedItem
    );

  return {
    game,
    play,
    updateSubmittedPlay,
    isPlayEditOpen,
    setIsPlayEditOpen,
    categories,
    categoriesList,
    isEveryCategoryChosen,
    isNoCategoriesChosen,
    items,
    itemsList,
    visibleItems,
    choseAllCategories,
    clearAllChosenCategories,
    changeCategoryChoose,
    pointingCategoryId,
    setPointingCategoryId,
    quitFromCreatingNewItem,
    updateSubmittedCategory,
    isCategoryEditOpen,
    setIsCategoryEditOpen,
    editingCategory,
    openCategoryCreating,
    openCategoryUpdating,
    isItemEditOpen,
    setIsItemEditOpen,
    creatingItemCoordinates,
    editingItem,
    openItemCreating,
    openItemUpdating,
    updateSubmittedItem,
    relocateItem,
    relocatingItem,
    updateItemCoordinates,
  };
};

export default usePlayProvider;
